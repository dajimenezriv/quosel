/** @jsxRuntime automatic @jsxImportSource react */
import { RichText } from '../core/rich-text';
import { slugify } from '../core/utils';
import type { GalleryBlock } from '../types';

export function Gallery({ block }: { block: GalleryBlock }) {
  return (
    <section id={slugify(block.nav)} className="bg-secondary flex justify-center p-6 md:p-24">
      <div className="flex w-full max-w-400 flex-col gap-10">
        <div className="flex flex-col gap-4">
          <p className="text-primary text-xs tracking-[0.25em] uppercase">— {block.nav}</p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="text-secondary-foreground text-5xl">
              <RichText text={block.title} />
            </h2>
            <p className="text-secondary-foreground/50 text-sm leading-relaxed italic md:w-150 md:text-end">{block.text}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {block.images.map((image, i) => (
            <img key={i} className="aspect-square object-cover opacity-80" src={image} />
          ))}
        </div>

        {block.ctaText && (
          <div className="mt-12 flex justify-center">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={block.ctaLink}
              className="text-primary hover:bg-primary hover:text-primary-foreground border-primary/60 border px-8 py-3 text-xs tracking-[0.2em] uppercase transition-all">
              {block.ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
