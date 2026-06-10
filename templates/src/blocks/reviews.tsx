import React from 'react';
import type { ReviewsBlock } from '../types';

export function Reviews({ block }: { block: ReviewsBlock }) {
  return (
    <section id={block.nav} className="flex justify-center py-24">
      <div className="flex max-w-400 flex-col">
        <div className="mb-8 flex flex-col gap-6 md:mb-16 md:flex-row md:items-start md:justify-between md:gap-16">
          <div>
            <p className="text-primary mb-4 text-xs tracking-[0.25em] uppercase">— {block.nav}</p>
            <h2 className="text-foreground text-5xl">{block.title}</h2>
          </div>

          <div className="shrink-0 border border-(--primary-30) p-6">
            <div className="grid grid-cols-2 divide-x divide-(--primary-20)">
              <div className="pr-8 text-center">
                <div className="text-primary text-4xl italic">4.8</div>
                <div className="text-primary mt-1">★★★★★</div>
                <div className="mt-2 text-xs tracking-[0.15em] text-(--foreground-30) uppercase">Google · 39k</div>
              </div>
              <div className="pl-8 text-center">
                <div className="text-primary text-4xl italic">4,9</div>
                <div className="text-primary mt-1">★★★★★</div>
                <div className="mt-2 text-xs tracking-[0.15em] text-(--foreground-30) uppercase">Booksy · 324</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {block.reviews.map((review) => (
            <div key={review.author} className="bg-secondary-foreground flex flex-col border border-(--foreground-10) p-8">
              <div className="text-primary text-lg">★★★★★</div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-(--foreground-80) italic">"{review.text}"</p>
              <div className="mt-6 flex items-center justify-between border-t border-(--foreground-10) pt-4">
                <span className="text-xs tracking-[0.15em] text-(--foreground-30) uppercase">{review.author}</span>
                <span className="text-xs tracking-[0.15em] text-(--foreground-25) uppercase">{review.source}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
