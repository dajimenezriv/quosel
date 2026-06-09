import React from 'react';
import type { WebsiteData } from '../types';

export function Stats({ data }: { data: WebsiteData }) {
  const block = data.blocks.stats;

  return (
    <section className="flex justify-around border-y border-(--foreground-10)">
      {block.map((stat, i) => (
        <div key={i} className="border-(--foreground-10) px-10 py-8 text-center">
          <div className="text-primary text-3xl italic">{stat.value}</div>
          <div className="mt-2 text-xs tracking-[0.2em] text-(--foreground-40) uppercase">{stat.label}</div>
        </div>
      ))}
    </section>
  );
}
