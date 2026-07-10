import { circoloPopolareBlocks } from './examples/circolo-popolare';
import { renderServicePage, renderTemplate } from './render';
import { claudeStyles } from './styles';
import type { ServicePage } from './types';

const data = {
  blocks: circoloPopolareBlocks,
  styles: claudeStyles,
  domain: 'https://circolo.quosel.app',
};

const servicePage: ServicePage = {
  type: 'service',
  slug: 'wood-fired-pizza-london',
  h1: 'Wood-Fired Pizza in London',
  metaTitle: 'Wood-Fired Pizza in London · Circolo Popolare',
  metaDescription: 'Authentic Neapolitan wood-fired pizza in Fitzrovia, London.',
  heroImageUrl: 'https://example.com/pizza.jpg',
  heroImageAlt: 'A Neapolitan pizza fresh from the wood-fired oven',
  intro: 'Our pizzaioli fire every pizza in a wood oven for a blistered, airy crust.',
  body: '## The Neapolitan method\n\nWe use *00 flour* and a 48-hour cold ferment.\n\n### What to expect\n\n- Leopard-spotted crust\n- San Marzano tomatoes\n\nSee our [menu](https://example.com/menu) for the full list.',
  ctaText: 'Book a Table',
  ctaLink: 'https://example.com/book',
};

describe('renderTemplate (homepage)', () => {
  it('uses the site canonical for the homepage', () => {
    expect(renderTemplate(data)).toContain('<link rel="canonical" href="https://circolo.quosel.app"/>');
  });
});

describe('renderServicePage', () => {
  const html = renderServicePage(data, servicePage);

  it('uses the page meta title and a per-page canonical url', () => {
    expect(html).toContain('<title>Wood-Fired Pizza in London · Circolo Popolare</title>');
    expect(html).toContain('<link rel="canonical" href="https://circolo.quosel.app/wood-fired-pizza-london"/>');
  });

  it('renders a single h1 with the keyword', () => {
    const h1Count = html.match(/<h1/g)?.length ?? 0;
    expect(h1Count).toBe(1);
    expect(html).toContain('Wood-Fired Pizza in London');
  });

  it('renders the body heading structure and links', () => {
    expect(html).toContain('<h2 class="mt-10 text-3xl">The Neapolitan method</h2>');
    expect(html).toContain('<h3 class="mt-8 text-xl">What to expect</h3>');
    expect(html).toContain('<a href="https://example.com/menu" class="text-primary underline">menu</a>');
  });

  it('emits Service and BreadcrumbList structured data', () => {
    expect(html).toContain('"@type":"Service"');
    expect(html).toContain('"@type":"BreadcrumbList"');
  });

  it('renders a breadcrumb back to the homepage', () => {
    expect(html).toContain('aria-label="Breadcrumb"');
    expect(html).toContain('href="https://circolo.quosel.app"');
  });
});

describe('internal linking', () => {
  const sibling: ServicePage = { ...servicePage, slug: 'gluten-free-pizza', h1: 'Gluten-Free Pizza' };
  const linkedData = {
    ...data,
    blocks: { ...circoloPopolareBlocks, pages: [servicePage, sibling] },
  };

  it('links the homepage footer to every service page with relative hrefs', () => {
    const html = renderTemplate(linkedData);
    expect(html).toContain('href="https://circolo.quosel.app/wood-fired-pizza-london"');
    expect(html).toContain('href="https://circolo.quosel.app/gluten-free-pizza"');
  });

  it('lists sibling pages under "Other services" on a service page', () => {
    const html = renderServicePage(linkedData, servicePage);
    expect(html).toContain('>Other services</h2>');
    expect(html).toContain('href="https://circolo.quosel.app/gluten-free-pizza"');
  });
});
