import React from 'react';
import type { WebsiteData } from '../types';

export function Reviews({ data }: { data: WebsiteData }) {
  return (
    <section id="reviews" className="bg-card px-6 py-12 md:px-24 md:py-20">
      <div className="mb-8 flex flex-col gap-6 md:mb-16 md:flex-row md:items-start md:justify-between md:gap-16">
        <div>
          <p className="text-primary mb-4 text-xs tracking-[0.25em] uppercase">— {data.blocks.reviews.nav}</p>
          <h2 className="text-foreground text-5xl font-(--font-serif)">{data.blocks.reviews.title}</h2>
        </div>

        <div className="shrink-0 border border-(--primary-30) p-6">
          <div className="grid grid-cols-2 divide-x divide-(--primary-20)">
            <div className="pr-8 text-center">
              <div className="text-primary text-4xl font-(--font-serif) italic">
                {data.blocks.reviews.rating ? data.blocks.reviews.rating.toString().replace('.', ',') : '–'}
              </div>
              <div className="text-primary mt-1">★★★★★</div>
              <div className="mt-2 text-xs tracking-[0.15em] text-(--foreground-30) uppercase">
                Google · {data.blocks.reviews.userRatingCount ?? 0}
              </div>
            </div>
            <div className="pl-8 text-center">
              <div className="text-primary text-4xl font-(--font-serif) italic">4,9</div>
              <div className="text-primary mt-1">★★★★★</div>
              <div className="mt-2 text-xs tracking-[0.15em] text-(--foreground-30) uppercase">Booksy · 324</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {data.blocks.reviews.reviews.map((review) => (
          <div key={review.author} className="bg-popover flex flex-col border border-(--foreground-10) p-8">
            <div className="text-primary text-lg">★★★★★</div>
            <p className="mt-4 flex-1 text-sm leading-relaxed font-(--font-serif) text-(--foreground-80) italic">"{review.text}"</p>
            <div className="mt-6 flex items-center justify-between border-t border-(--foreground-10) pt-4">
              <span className="text-xs tracking-[0.15em] text-(--foreground-30) uppercase">{review.author}</span>
              <span className="text-xs tracking-[0.15em] text-(--foreground-25) uppercase">{review.source}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
