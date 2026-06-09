import React from 'react';
import { About } from './blocks/about';
import { CTA } from './blocks/cta';
import { Footer } from './blocks/footer';
import { Gallery } from './blocks/gallery';
import { Hero } from './blocks/hero';
import { Location } from './blocks/location';
import { Navigation } from './blocks/navigation';
import { Reviews } from './blocks/reviews';
import { Services } from './blocks/services';
import { Stats } from './blocks/stats';
import type { WebsiteData } from './types';

export function buildRootStyles(data: WebsiteData) {
  const themeVars = Object.entries(data.styles)
    .filter(([, v]) => v != null)
    .map(([k, v]) => `  --${k}: ${v};`)
    .join('\n');

  const opacityEntries: [string, number[]][] = [
    ['primary', [10, 20, 30, 60, 70]],
    ['foreground', [10, 25, 30, 40, 50, 60, 70, 80]],
  ];

  const opacityVars = opacityEntries
    .flatMap(([name, opacities]) => opacities.map((op) => `  --${name}-${op}: color-mix(in srgb, var(--${name}) ${op}%, transparent);`))
    .join('\n');

  const colorVars = Object.entries(data.styles)
    .filter(([, v]) => v != null)
    .map(([k, v]) => `  --color-${k}: ${v};`)
    .join('\n');

  const res = `@theme inline {\n${colorVars}\n}
  
  :root {\n${themeVars}\n${opacityVars}\n}`;

  return res;
}

export function TemplateBody({ data }: { data: WebsiteData }) {
  return (
    <div className="bg-background text-foreground min-h-screen font-(--font-sans)">
      <Navigation data={data} />
      <Hero data={data} />
      <Stats data={data} />
      <About data={data} />
      <Gallery data={data} />
      <Reviews data={data} />
      <Services data={data} />
      <Location data={data} />
      <CTA />
      <Footer data={data} />
    </div>
  );
}

export function Template({ data }: { data: WebsiteData }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{data.blocks.name}</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap"
        />
        <style type="text/tailwindcss" dangerouslySetInnerHTML={{ __html: buildRootStyles(data) }} />
      </head>
      <body>
        <TemplateBody data={data} />
      </body>
    </html>
  );
}
