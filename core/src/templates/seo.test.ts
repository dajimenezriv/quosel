import { emptyBlocks } from './examples/empty';
import { renderRobots, renderSitemap } from './seo';
import { claudeStyles } from './styles';
import type { ServicePage, TemplateData } from './types';

function page(slug: string): ServicePage {
  return {
    type: 'service',
    slug,
    h1: slug,
    metaTitle: '',
    metaDescription: '',
    heroImageUrl: '',
    heroImageAlt: '',
    intro: '',
    body: '',
    ctaText: '',
    ctaLink: '',
  };
}

const data: TemplateData = {
  blocks: { ...emptyBlocks, pages: [page('teeth-whitening'), page('dental-implants')] },
  styles: claudeStyles,
  domain: 'https://acme.quosel.app',
};

describe('renderSitemap', () => {
  it('lists the homepage and every service page', () => {
    expect(renderSitemap(data)).toBe(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://acme.quosel.app</loc></url>
  <url><loc>https://acme.quosel.app/teeth-whitening</loc></url>
  <url><loc>https://acme.quosel.app/dental-implants</loc></url>
</urlset>
`,
    );
  });
});

describe('renderRobots', () => {
  it('allows all and points to the sitemap', () => {
    expect(renderRobots(data)).toBe(
      `User-agent: *
Allow: /

Sitemap: https://acme.quosel.app/sitemap.xml
`,
    );
  });
});
