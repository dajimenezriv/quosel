import { ApiError } from '@/core/api/errors';
import type { AuthVariables } from '@/core/api/middleware/auth';
import { setupResponses } from '@/core/api/utils';
import { Websites } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';
import { BasicTemplate, type WebsiteData } from '@quosel/templates';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const wrapHtml = (body: string) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
${body}
</body>
</html>`;

export const publishRoute = createRoute({
  method: 'post',
  path: '/render-website/{websiteId}',
  request: {
    params: z.object({ websiteId: z.string() }),
  },
  responses: setupResponses(204),
});

export const publish: RouteHandler<typeof publishRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const websiteId = c.req.param('websiteId');

  const website = await Websites.getById(userId, websiteId);
  if (!website) throw new ApiError(404, 'Website not found');

  const data: WebsiteData = {
    place: {
      name: website.place.name,
      internationalPhoneNumber: website.place.internationalPhoneNumber,
      formattedAddress: website.place.formattedAddress,
      rating: website.place.rating,
      userRatingCount: website.place.userRatingCount,
    },
    websiteImages: website.websiteImages,
  };

  const html = renderToStaticMarkup(createElement(BasicTemplate, { data }));
  return c.html(wrapHtml(html));
};
