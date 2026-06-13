/** @jsxRuntime automatic @jsxImportSource react */
import type { HeroBlock } from '../types';

export function Hero({ block }: { block: HeroBlock }) {
  return (
    <section id="home" className="relative flex min-h-screen items-end">
      <img src={block.imageUrl} className="absolute h-full w-full object-cover" />
      <div className="from-background via-background/70 to-background/50 absolute inset-0 bg-linear-to-t" />

      <div className="z-10 m-6 flex flex-col md:m-30">
        <span className="text-foreground text-6xl font-light md:text-8xl">{block.firstTitle}</span>
        <span className="text-primary text-6xl font-light italic md:text-8xl">{block.secondTitle}</span>

        <p className="text-foreground/70 mt-8 italic md:w-150">{block.text}</p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
