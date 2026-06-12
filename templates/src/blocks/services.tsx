/** @jsxRuntime automatic @jsxImportSource react */
import type { ServicesBlock } from '../types';

export function Services({ block }: { block: ServicesBlock }) {
  return (
    <section id={block.nav} className="bg-secondary flex justify-center py-24">
      <div className="flex w-250 flex-col">
        <div className="mb-10 flex flex-col">
          <p className="text-primary mb-4 text-xs tracking-[0.25em] uppercase">— Carta</p>
          <h2 className="text-secondary-foreground text-5xl leading-tight">{block.title}</h2>
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
                    <div className="flex items-center justify-between py-2">
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

        {/* Footer */}
        <div className="border-secondary-foreground/10 mt-10 flex flex-col gap-4 border-t pt-8 md:mt-16 md:flex-row md:items-center md:justify-between">
          <a
            target="__blank"
            href={block.ctaLink}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-primary/10 border px-6 py-3 text-xs tracking-[0.2em] uppercase transition-all">
            {block.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
