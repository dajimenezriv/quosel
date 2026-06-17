/** @jsxRuntime automatic @jsxImportSource react */
import { RichText } from '../core/rich-text';
import { slugify } from '../core/utils';
import type { ServicesBlock } from '../types';

export function Services({ block }: { block: ServicesBlock }) {
  return (
    <section id={slugify(block.nav)} className="bg-secondary flex justify-center px-6 py-24 md:px-0">
      <div className="flex w-full max-w-250 flex-col gap-10">
        <div className="flex flex-col gap-4">
          <p className="text-primary text-xs tracking-[0.25em] uppercase">— {block.nav}</p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="text-5xl">
              <RichText text={block.title} />
            </h2>
            <p className="text-sm leading-relaxed md:w-100 md:text-end">
              <RichText text={block.text} />
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {block.serviceGroups.map((group) => (
            <div key={group.title}>
              <div className="border-primary/30 border-b pb-2">
                <span className="text-primary text-xs tracking-[0.2em] uppercase">{group.title}</span>
              </div>

              <div>
                {group.services.map((item, i) => (
                  <div key={item.title} className="flex flex-col">
                    <div className="flex items-center justify-between gap-4 py-2">
                      <div className="flex flex-col">
                        <p className="text-secondary-foreground text-base">{item.title}</p>
                        <p className="text-secondary-foreground/40 text-xs leading-relaxed">{item.text}</p>
                      </div>
                      <span className="text-primary text-right text-xl italic">{item.price}</span>
                    </div>
                    {i < group.services.length - 1 && <div className="border-secondary-foreground/10 border-t" />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {block.ctaText && (
          <div className="border-secondary-foreground/10 flex flex-col gap-4 border-t pt-8 md:flex-row md:items-center md:justify-between">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={block.ctaLink}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-primary/10 border px-6 py-3 text-xs tracking-[0.2em] uppercase transition-all">
              {block.ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
