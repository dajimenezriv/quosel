/** @jsxRuntime automatic @jsxImportSource react */
import { RichText } from '../core/rich-text';
import type { CtaBlock } from '../types';

export function CTA({ block }: { block: CtaBlock }) {
  return (
    <section className="relative flex min-h-96 items-center justify-center py-32 text-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${block.imageUrl}')`,
        }}
      />
      <div className="bg-background/80 absolute inset-0" />
      <div className="relative z-10 max-w-2xl px-6 md:px-8">
        <h2 className="text-4xl leading-tight md:text-6xl">
          <RichText text={block.title} />
        </h2>
        <p className="mt-6 text-sm leading-relaxed">
          <RichText text={block.text} />
        </p>
        {block.ctaText && (
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href={block.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-8 py-4 text-center text-xs tracking-[0.2em] uppercase transition-colors hover:opacity-90">
              {block.ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
