import React from 'react';
import type { WebsiteData } from '../types';

export function About({ data }: { data: WebsiteData }) {
  return (
    <section id="about" className="flex justify-center py-24">
      <div className="flex w-250 flex-col">
        <p className="text-primary text-xs tracking-[0.25em] uppercase">— {data.blocks.aboutUs.nav}</p>
        <h2 className="mt-6 text-5xl leading-tight">{data.blocks.aboutUs.title}</h2>

        <div className="mt-10 flex gap-20">
          <div className="flex flex-1 flex-col">
            <blockquote className="border-primary mt-10 border-l-2 pl-6 text-lg text-(--foreground-70) italic">
              {data.blocks.aboutUs.text1}
            </blockquote>
            <p className="mt-6 leading-relaxed text-(--foreground-60)">{data.blocks.aboutUs.text2}</p>
          </div>

          <img src={data.blocks.aboutUs.imageUrl} className="h-130 w-130 object-cover opacity-80" />
        </div>
      </div>
    </section>
  );
}
