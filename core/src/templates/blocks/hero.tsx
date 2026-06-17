/** @jsxRuntime automatic @jsxImportSource react */
import { RichText } from '../core/rich-text';
import type { HeroBlock } from '../types';

export function Hero({ block }: { block: HeroBlock }) {
  return (
    <section id="home" className="relative flex min-h-screen items-end">
      <img src={block.imageUrl} className="absolute h-full w-full object-cover" />
      <div className="from-background via-background/70 to-background/50 absolute inset-0 bg-linear-to-t" />

      <div className="z-10 m-6 flex max-w-full flex-col md:m-30">
        <span className="text-5xl font-light wrap-break-word sm:text-6xl md:text-8xl">
          <RichText text={block.title} />
        </span>

        <p className="mt-8 md:max-w-150">
          <RichText text={block.text} />
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={block.ctaLink}
            className="bg-primary text-primary-foreground px-8 py-3 text-center text-xs tracking-[0.25em] uppercase hover:opacity-90">
            {block.ctaText}
          </a>
          <a
            href={`tel:${block.phone}`}
            className="hover:border-foreground border-foreground/40 border px-8 py-3 text-center text-xs tracking-[0.2em] uppercase">
            {block.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
