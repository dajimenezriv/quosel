import type { AuthVariables } from '@/core/api/middleware/auth';
import { jsonResponse, setupResponses } from '@/core/api/utils';
import { Websites } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';
import { stylesSchema, type Styles } from '@quosel/templates';

const WebsiteSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  domain: z.string().nullable(),
  styles: stylesSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

const ResponseSchema = z.object({ websites: z.array(WebsiteSchema) });

export const getWebsitesRoute = createRoute({
  method: 'get',
  path: '/',
  responses: setupResponses(200, ResponseSchema),
});

export const getWebsites: RouteHandler<typeof getWebsitesRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const rawWebsites = await Websites.getAllByUserId(userId);

  const websites = rawWebsites.map((rawWebsite) => ({
    ...rawWebsite,
    styles: rawWebsite.styles as Styles,
  }));

  return jsonResponse(c, ResponseSchema, { websites }, 200);
};
