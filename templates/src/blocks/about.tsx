import React from 'react';
import type { WebsiteData } from '../types';

export function About({ data }: { data: WebsiteData }) {
  return (
    <section id="about" className="flex justify-center bg-[var(--card)] py-24">
      <div className="flex flex-col">
        <p className="text-xs tracking-[0.25em] text-[var(--primary)] uppercase">— {data.blocks.aboutUs.nav}</p>
        <h2 className="mt-6 text-5xl leading-tight font-[var(--font-serif)] font-light">{data.blocks.aboutUs.title}</h2>

        <div className="mt-10 flex w-[1300px] gap-20">
          <div className="flex flex-1 flex-col">
            <blockquote className="mt-10 border-l-2 border-[var(--primary)] pl-6 text-lg font-[var(--font-serif)] text-[var(--foreground-70)] italic">
              {data.blocks.aboutUs.text1}
            </blockquote>
            <p className="mt-6 leading-relaxed text-[var(--foreground-60)]">{data.blocks.aboutUs.text2}</p>
          </div>

          <div className="aspect-square flex-1 bg-[var(--muted)]">
            <img src={data.blocks.aboutUs.imageUrl} className="h-full w-full object-cover opacity-80" />
          </div>
        </div>
      </div>
    </section>
  );
}
