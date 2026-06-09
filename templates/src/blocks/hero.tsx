import React from 'react';
import type { WebsiteData } from '../types';

export function Hero({ data }: { data: WebsiteData }) {
  return (
    <section id="home" className="relative flex min-h-screen items-end">
      <img src={data.blocks.hero.imageUrl} className="absolute h-full w-full object-cover opacity-10" />

      <div className="z-10 m-30 flex flex-col">
        <span className="text-foreground text-8xl font-light">{data.blocks.hero.firstTitle}</span>
        <span className="text-primary text-8xl font-light italic">{data.blocks.hero.secondTitle}</span>

        <p className="mt-8 w-150 text-(--foreground-70) italic">{data.blocks.hero.text}</p>

        <div className="mt-10 flex gap-3">
          <a
            target="__blank"
            href={data.blocks.hero.ctaLink}
            className="bg-primary text-primary-foreground px-8 py-3 text-center text-xs tracking-[0.25em] uppercase hover:opacity-90">
            {data.blocks.hero.ctaText}
          </a>
          <a
            href={`tel:${data.blocks.hero.phone}`}
            className="hover:border-foreground border border-(--foreground-40) px-8 py-3 text-center text-xs tracking-[0.2em] uppercase">
            {data.blocks.hero.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
