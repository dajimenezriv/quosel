/** @jsxRuntime automatic @jsxImportSource react */
import { slugify } from '../core/utils';
import type { ReviewsBlock } from '../types';

export function Reviews({ block }: { block: ReviewsBlock }) {
  return (
    <section id={slugify(block.nav)} className="flex justify-center px-6 py-24 md:px-0">
      <div className="flex w-full max-w-400 flex-col">
        <div className="mb-8 flex flex-col gap-6 md:mb-16 md:flex-row md:items-start md:justify-between md:gap-16">
          <div>
            <p className="text-primary mb-4 text-xs tracking-[0.25em] uppercase">— {block.nav}</p>
            <h2 className="text-foreground text-5xl">{block.title}</h2>
          </div>

          {block.stats.length > 0 && (
            <div className="border-primary/30 shrink-0 border p-6">
              <div className="divide-primary/20 flex divide-x">
                {block.stats.map((stat, statIndex) => (
                  <div key={statIndex} className="px-8 text-center first:pl-0 last:pr-0">
                    <div className="text-primary text-4xl italic">{stat.value}</div>
                    <div className="text-primary mt-1">★★★★★</div>
                    <div className="text-foreground/30 mt-2 text-xs tracking-[0.15em] uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {block.reviews.map((review) => (
            <div key={review.author} className="bg-secondary border-secondary-foreground/10 flex flex-col border p-8">
              <div className="text-primary text-lg">★★★★★</div>
              <p className="text-secondary-foreground/80 mt-4 flex-1 text-sm leading-relaxed italic">"{review.text}"</p>
              <div className="border-secondary-foreground/10 mt-6 flex items-center justify-between border-t pt-4">
                <span className="text-secondary-foreground/30 text-xs tracking-[0.15em] uppercase">{review.author}</span>
                <span className="text-secondary-foreground/25 text-xs tracking-[0.15em] uppercase">{review.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
