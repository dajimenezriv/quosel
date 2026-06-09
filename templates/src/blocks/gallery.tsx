import React from 'react';
import type { WebsiteData } from '../types';

export function Gallery({ data }: { data: WebsiteData }) {
  return (
    <section id="gallery" className="bg-popover flex justify-center px-24 py-24">
      <div className="flex flex-col">
        <div className="mb-8 grid gap-6 md:mb-12 md:grid-cols-2 md:items-start md:gap-16">
          <div>
            <p className="text-primary mb-4 text-xs tracking-[0.25em] uppercase">— {data.blocks.gallery.nav}</p>
            <h2 className="text-foreground text-5xl font-(--font-serif)">{data.blocks.gallery.title}</h2>
          </div>
          <p className="pt-12 text-sm leading-relaxed font-(--font-serif) text-(--foreground-50) italic">{data.blocks.gallery.text}</p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {data.blocks.gallery.images.map((image, i) => (
            <img key={i} className="bg-muted aspect-square object-cover opacity-80" src={image} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            target="__blank"
            href={data.blocks.gallery.ctaLink}
            className="text-primary hover:bg-primary hover:text-primary-foreground border border-(--primary-60) px-8 py-3 text-xs tracking-[0.2em] uppercase transition-all">
            {data.blocks.gallery.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
