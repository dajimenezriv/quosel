import React from "react";
import type { WebsiteData } from "../types";
import { SERIF } from "../utils";

export function Gallery({ data }: { data: WebsiteData }) {
  return (
    <section
      id="gallery"
      className="bg-[var(--background)] px-6 py-12 md:px-24 md:py-20"
    >
      <div className="mb-8 grid gap-6 md:mb-12 md:grid-cols-2 md:items-start md:gap-16">
        <div>
          <p className="mb-4 text-xs tracking-[0.25em] uppercase text-[var(--primary)]">
            — {data.blocks.gallery.nav}
          </p>
          <h2
            className="text-5xl font-light text-[var(--foreground)]"
            style={{ fontFamily: SERIF }}
          >
            {data.blocks.gallery.title}
          </h2>
        </div>
        <p
          className="text-sm italic leading-relaxed text-[var(--foreground-50)] md:pt-12"
          style={{ fontFamily: SERIF }}
        >
          {data.blocks.gallery.text}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square bg-[var(--muted)]" />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <a
          href="#"
          className="border border-[var(--primary-60)] px-8 py-3 text-xs tracking-[0.2em] uppercase text-[var(--primary)] transition-all hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]"
        >
          Ver Más en Instagram →
        </a>
      </div>
    </section>
  );
}
