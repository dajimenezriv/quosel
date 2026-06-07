import React from "react";
import type { WebsiteData } from "../types";
import { SERIF } from "../utils";

export function Hero({ data }: { data: WebsiteData }) {
  return (
    <section className="relative flex min-h-screen items-center">
      <div className="absolute inset-0">
        {data.blocks.hero.imageUrl && (
          <img
            src={data.blocks.hero.imageUrl}
            alt=""
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-[var(--popover)] opacity-80" />
      </div>

      <div className="relative z-10 px-6 pb-24 md:px-24">
        <h1 className="leading-none" style={{ fontFamily: SERIF }}>
          <span className="block text-5xl font-light text-[var(--foreground)] md:text-7xl lg:text-8xl">
            {data.blocks.hero.firstTitle}
          </span>
          <span className="block text-5xl font-light italic text-[var(--primary)] md:text-7xl lg:text-8xl">
            {data.blocks.hero.secondTitle}
          </span>
        </h1>

        <p
          className="mt-8 max-w-xs text-base italic text-[var(--foreground-70)] md:max-w-sm"
          style={{ fontFamily: SERIF }}
        >
          {data.blocks.hero.text}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            target="__blank"
            href={data.blocks.hero.ctaLink}
            className="bg-[var(--primary)] px-8 py-3 text-center text-xs tracking-[0.25em] uppercase text-[var(--primary-foreground)] transition-colors hover:opacity-90"
          >
            {data.blocks.hero.ctaText}
          </a>
          <a
            href={`tel:${data.blocks.hero.phone}`}
            className="border border-[var(--foreground-40)] px-8 py-3 text-center text-xs tracking-[0.2em] uppercase transition-colors hover:border-[var(--foreground)]"
          >
            {data.blocks.hero.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
