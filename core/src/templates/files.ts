import { renderServicePage, renderTemplate } from './render';
import { renderRobots, renderSitemap } from './seo';
import type { TemplateData } from './types';

export interface SiteFile {
  path: string;
  content: string;
  contentType: string;
}

export function buildSiteFiles(data: TemplateData): SiteFile[] {
  return [
    { path: 'index.html', content: renderTemplate(data), contentType: 'text/html' },
    ...data.blocks.pages.map((page) => ({
      path: `${page.slug}.html`,
      content: renderServicePage(data, page),
      contentType: 'text/html',
    })),
    { path: 'sitemap.xml', content: renderSitemap(data), contentType: 'application/xml' },
    { path: 'robots.txt', content: renderRobots(data), contentType: 'text/plain' },
  ];
}
