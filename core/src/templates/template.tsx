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
      {data.blocks.blocks.map((block, i) => {
        if (block.type === 'stats') return <Stats key={i} block={block} />;
        if (block.type === 'hero') return <Hero key={i} block={block} />;
        if (block.type === 'info') return <Info key={i} block={block} />;
        if (block.type === 'gallery') return <Gallery key={i} block={block} />;
        if (block.type === 'reviews') return <Reviews key={i} block={block} />;
        if (block.type === 'services') return <Services key={i} block={block} />;
        if (block.type === 'location') return <Location key={i} block={block} />;
        if (block.type === 'cta') return <CTA key={i} block={block} />;
        if (block.type === 'footer') return <Footer key={i} data={data} block={block} />;
        return null;
      })}
    </div>
  );
}

export function Template({ data }: { data: TemplateData }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{data.blocks.name}</title>
        {data.blocks.logoUrl && <link rel="icon" href={data.blocks.logoUrl} />}
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <style type="text/tailwindcss" dangerouslySetInnerHTML={{ __html: buildRootStyles(data) }} />
      </head>
      <body>
        <TemplateBody data={data} />
      </body>
    </html>
  );
}
