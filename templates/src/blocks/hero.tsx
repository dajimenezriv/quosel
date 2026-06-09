import React from 'react';
import type { HeroBlock } from '../types';

export function Hero({ block }: { block: HeroBlock }) {
  return (
    <section id="home" className="relative flex min-h-screen items-end">
      <img src={block.imageUrl} className="absolute h-full w-full object-cover opacity-10" />

      <div className="z-10 m-30 flex flex-col">
        <span className="text-foreground text-8xl font-light">{block.firstTitle}</span>
        <span className="text-primary text-8xl font-light italic">{block.secondTitle}</span>

        <p className="mt-8 w-150 text-(--foreground-70) italic">{block.text}</p>

        <div className="mt-10 flex gap-3">
          <a
            target="__blank"
            href={block.ctaLink}
            className="bg-primary text-primary-foreground px-8 py-3 text-center text-xs tracking-[0.25em] uppercase hover:opacity-90">
            {block.ctaText}
          </a>
          <a
            href={`tel:${block.phone}`}
            className="hover:border-foreground border border-(--foreground-40) px-8 py-3 text-center text-xs tracking-[0.2em] uppercase">
            {block.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
