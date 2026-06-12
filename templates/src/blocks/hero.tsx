/** @jsxRuntime automatic @jsxImportSource react */
import type { HeroBlock } from '../types';

export function Hero({ block }: { block: HeroBlock }) {
  return (
    <section id="home" className="relative flex min-h-screen items-end">
      <img src={block.imageUrl} className="absolute h-full w-full object-cover" />
      <div className="from-background via-background/70 to-background/50 absolute inset-0 bg-linear-to-t" />

      <div className="z-10 m-30 flex flex-col">
        <span className="text-foreground text-8xl font-light">{block.firstTitle}</span>
        <span className="text-primary text-8xl font-light italic">{block.secondTitle}</span>

        <p className="text-foreground/70 mt-8 w-150 italic">{block.text}</p>

        <div className="mt-10 flex gap-3">
          <a
            target="__blank"
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
