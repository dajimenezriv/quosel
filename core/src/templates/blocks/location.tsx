/** @jsxRuntime automatic @jsxImportSource react */
import { RichText } from '../core/rich-text';
import { slugify } from '../core/utils';
import type { LocationBlock } from '../types';

export function Location({ block }: { block: LocationBlock }) {
  return (
    <section id={slugify(block.nav)} className="bg-background flex justify-center px-6 py-24 md:px-0">
      <div className="flex w-full max-w-300 flex-col gap-12 md:flex-row md:items-center md:gap-20">
        <div className="flex flex-1 flex-col">
          <p className="text-primary mb-6 text-xs tracking-[0.25em] uppercase">— {block.nav}</p>
          <h2 className="text-foreground mb-8 text-5xl leading-tight md:mb-14 md:text-7xl">
            <RichText text={block.title} />
          </h2>

          <div>
            {block.details.map((detail, i) => (
              <div key={i} className="border-foreground/10 flex gap-12 border-t py-6">
                <span className="text-primary/70 w-30 shrink-0 text-xs tracking-[0.2em] uppercase">{detail.label}</span>
                <p className="text-foreground text-sm">
                  <RichText text={detail.value} />
                </p>
              </div>
            ))}

            {block.schedule.items.length > 0 && (
              <div className="border-foreground/10 flex flex-col gap-3 border-t py-6 md:flex-row md:gap-12">
                <span className="text-primary/70 w-30 shrink-0 text-xs tracking-[0.2em] uppercase">{block.schedule.title}</span>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 text-sm md:block md:space-y-1.5">
                  {block.schedule.items.map((item, i) => (
                    <div key={i} className="contents md:flex md:gap-8">
                      <span className="text-foreground md:w-36">{item.label}</span>
                      <span className="text-foreground/60">
                        <RichText text={item.value} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-10">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={block.ctaLink}
              className="bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.2em] uppercase transition-colors hover:opacity-90">
              {block.ctaText}
            </a>
          </div>
        </div>

        <iframe src={block.mapUrl} className="flex aspect-square w-full flex-1 border-0 opacity-80 md:w-120" loading="lazy"></iframe>
      </div>
    </section>
  );
}
