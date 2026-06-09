import React from 'react';
import type { WebsiteData } from '../types';

export function Stats({ data }: { data: WebsiteData }) {
  const stats = [
    { value: '4,8★', label: 'GOOGLE · 39.177 REVIEWS' },
    { value: '4,2★', label: 'TRIPADVISOR · 2.715 REVIEWS' },
    { value: '+87K', label: 'FOLLOWERS ON INSTAGRAM' },
    { value: 'M-S', label: 'MORNING AND AFTERNOON' },
  ];

  return (
    <section className="grid grid-cols-2 border-t border-b border-[var(--foreground-10)] bg-[var(--card)] md:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`px-10 py-8 text-center border-[var(--foreground-10)]${
            i % 2 === 0 ? 'border-r' : ''
          }${i < 2 ? 'border-b md:border-b-0' : ''}${i % 2 !== 0 && i < 3 ? 'md:border-r' : ''}`}>
          <div className="text-3xl font-[var(--font-serif)] font-light text-[var(--primary)] italic">{stat.value}</div>
          <div className="mt-2 text-xs tracking-[0.2em] text-[var(--foreground-40)] uppercase">{stat.label}</div>
        </div>
      ))}
    </section>
  );
}
