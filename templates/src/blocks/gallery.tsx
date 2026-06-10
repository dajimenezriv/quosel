import React from 'react';
import type { GalleryBlock } from '../types';

export function Gallery({ block }: { block: GalleryBlock }) {
  return (
    <section id={block.nav} className="bg-secondary-foreground flex justify-center p-24">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <p className="text-primary text-xs tracking-[0.25em] uppercase">— {block.nav}</p>
          <div className="flex items-end justify-between">
            <h2 className="text-foreground text-5xl">{block.title}</h2>
            <p className="w-150 text-sm leading-relaxed text-(--foreground-50) italic">{block.text}</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {block.images.map((image, i) => (
            <img key={i} className="aspect-square object-cover opacity-80" src={image} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            target="__blank"
            href={block.ctaLink}
            className="text-primary hover:bg-primary hover:text-primary-foreground border border-(--primary-60) px-8 py-3 text-xs tracking-[0.2em] uppercase transition-all">
            {block.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
