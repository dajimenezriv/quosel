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
import { parseRawData } from './core/utils';
import type { TemplateData } from './types';

interface Props {
  data: TemplateData;
}

export function HomepageBody({ data: rawData }: Props) {
  const data = parseRawData(rawData);

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
