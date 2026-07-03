/** @jsxRuntime automatic @jsxImportSource react */
import { CTA } from './blocks/cta';
import { Footer } from './blocks/footer';
import { Gallery } from './blocks/gallery';
import { Hero } from './blocks/hero';
import { Info } from './blocks/info';
import { Location } from './blocks/location';
import { Nav } from './blocks/nav';
import { Reviews } from './blocks/reviews';
import { Services } from './blocks/services';
import { Stats } from './blocks/stats';
import { buildRootStyles } from './styles';
import type { TemplateData } from './types';

export function TemplateBody({ data }: { data: TemplateData }) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Nav data={data} />
      <Hero data={data} block={data.blocks.homepage.hero} />
      {data.blocks.homepage.blocks.map((block, i) => {
        if (block.type === 'stats') return <Stats key={i} block={block} />;
        if (block.type === 'info') return <Info key={i} block={block} />;
        if (block.type === 'gallery') return <Gallery key={i} block={block} />;
        if (block.type === 'reviews') return <Reviews key={i} block={block} />;
        if (block.type === 'services') return <Services key={i} block={block} />;
        if (block.type === 'location') return <Location key={i} data={data} block={block} />;
        if (block.type === 'cta') return <CTA key={i} block={block} />;
        return null;
      })}
      <Footer data={data} block={data.blocks.footer} />
    </div>
  );
}

export function Template({ data }: { data: TemplateData }) {
  const title = data.blocks.metaTitle || data.blocks.name;
  const description = data.blocks.metaDescription;
  const imageUrl = data.blocks.homepage.hero.imageUrl;

  // This is to generate rich results for machines
  // https://search.google.com/test/rich-results
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.blocks.name,
    address: data.blocks.address,
    telephone: data.blocks.phone,
  });

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        {data.canonicalUrl && <link rel="canonical" href={data.canonicalUrl} />}
        {data.blocks.logoUrl && <link rel="icon" href={data.blocks.logoUrl} />}

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={description} />}
        {data.canonicalUrl && <meta property="og:url" content={data.canonicalUrl} />}
        {imageUrl && <meta property="og:image" content={imageUrl} />}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        {description && <meta name="twitter:description" content={description} />}
        {imageUrl && <meta name="twitter:image" content={imageUrl} />}

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <style type="text/tailwindcss" dangerouslySetInnerHTML={{ __html: buildRootStyles(data) }} />
      </head>
      <body>
        <TemplateBody data={data} />
      </body>
    </html>
  );
}
