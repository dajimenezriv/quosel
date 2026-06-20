import { requireAuth, type AuthVariables } from '@/core/api/middleware/auth';
import { jsonResponse, setupResponses } from '@/core/api/utils';
import { Websites } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';
import { stylesSchema, type Blocks, type Styles } from '@quosel/core/templates';

const WebsiteSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  slug: z.string(),
  editToken: z.string(),
  logoUrl: z.string(),
  heroImageUrl: z.string(),
  styles: stylesSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date().nullable(),
});

const ResponseSchema = z.object({ websites: z.array(WebsiteSchema) });

export const getWebsitesRoute = createRoute({
  method: 'get',
  path: '/',
  middleware: [requireAuth],
  responses: setupResponses(200, ResponseSchema),
});

export const getWebsites: RouteHandler<typeof getWebsitesRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const rawWebsites = await Websites.getAllByUserId(userId);

  const websites = rawWebsites.map((rawWebsite) => {
    const blocks = rawWebsite.blocks as Blocks;
    const heroBlock = blocks.blocks.find((block) => block.type === 'hero');

    return {
      ...rawWebsite,
      logoUrl: blocks.logoUrl,
      heroImageUrl: heroBlock?.imageUrl ?? '',
      styles: rawWebsite.styles as Styles,
    };
  });

  return jsonResponse(c, ResponseSchema, { websites }, 200);
};
