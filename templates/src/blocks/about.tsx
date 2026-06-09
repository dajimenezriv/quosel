import React from 'react';
import type { WebsiteData } from '../types';

export function About({ data }: { data: WebsiteData }) {
  return (
    <section id="about" className="bg-card flex justify-center py-24">
      <div className="flex flex-col">
        <p className="text-primary text-xs tracking-[0.25em] uppercase">— {data.blocks.aboutUs.nav}</p>
        <h2 className="mt-6 text-5xl leading-tight">{data.blocks.aboutUs.title}</h2>

        <div className="mt-10 flex w-325 gap-20">
          <div className="flex flex-1 flex-col">
            <blockquote className="border-primary mt-10 border-l-2 pl-6 text-lg text-(--foreground-70) italic">
              {data.blocks.aboutUs.text1}
            </blockquote>
            <p className="mt-6 leading-relaxed text-(--foreground-60)">{data.blocks.aboutUs.text2}</p>
          </div>

          <div className="bg-muted aspect-square flex-1">
            <img src={data.blocks.aboutUs.imageUrl} className="h-full w-full object-cover opacity-80" />
          </div>
        </div>
      </div>
    </section>
  );
}
