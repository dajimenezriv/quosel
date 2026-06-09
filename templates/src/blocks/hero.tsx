import React from 'react';
import type { WebsiteData } from '../types';

export function Hero({ data }: { data: WebsiteData }) {
  return (
    <section className="relative flex min-h-screen items-center">
      <div className="absolute inset-0">
        <img src={data.blocks.hero.imageUrl} className="h-full w-full object-cover opacity-10" />
      </div>

      <div className="z-10 px-6 pb-24 md:px-24">
        <h1 className="leading-none font-[var(--font-serif)]">
          <span className="block text-5xl font-light text-[var(--foreground)] md:text-7xl lg:text-8xl">{data.blocks.hero.firstTitle}</span>
          <span className="block text-5xl font-light text-[var(--primary)] italic md:text-7xl lg:text-8xl">
            {data.blocks.hero.secondTitle}
          </span>
        </h1>

        <p className="mt-8 max-w-xl text-base font-[var(--font-serif)] text-[var(--foreground-70)] italic">{data.blocks.hero.text}</p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            target="__blank"
            href={data.blocks.hero.ctaLink}
            className="bg-[var(--primary)] px-8 py-3 text-center text-xs tracking-[0.25em] text-[var(--primary-foreground)] uppercase transition-colors hover:opacity-90">
            {data.blocks.hero.ctaText}
          </a>
          <a
            href={`tel:${data.blocks.hero.phone}`}
            className="border border-[var(--foreground-40)] px-8 py-3 text-center text-xs tracking-[0.2em] uppercase transition-colors hover:border-[var(--foreground)]">
            {data.blocks.hero.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
