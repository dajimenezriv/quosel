import React from 'react';
import type { LocationBlock } from '../types';

export function Location({ block }: { block: LocationBlock }) {
  return (
    <section id="location" className="bg-background flex justify-center py-24">
      <div className="flex w-300 items-center gap-20">
        <div className="flex flex-1 flex-col">
          <p className="text-primary mb-6 text-xs tracking-[0.25em] uppercase">— {block.nav}</p>
          <h2 className="text-foreground mb-8 text-5xl leading-tight md:mb-14 md:text-7xl">
            {block.formattedAddress.split(',')[0]?.trim()},{' '}
            <em className="text-primary italic">{block.formattedAddress.split(',')[1]?.trim()}</em>.
          </h2>

          <div>
            {/* Dirección */}
            <div className="flex gap-12 border-t border-(--foreground-10) py-6">
              <span className="w-30 shrink-0 text-xs tracking-[0.2em] text-(--primary-70) uppercase">Dirección</span>
              <div>
                <p className="text-foreground text-sm">{block.formattedAddress.split(',').slice(0, 2).join(',').trim()}</p>
                <p className="mt-1 text-xs text-(--foreground-40)">{block.formattedAddress.split(',').slice(2).join(',').trim()}</p>
              </div>
            </div>

            <div className="flex gap-12 border-t border-(--foreground-10) py-6">
              <span className="w-30 shrink-0 text-xs tracking-[0.2em] text-(--primary-70) uppercase">Phone</span>
              <p className="text-foreground text-sm">{block.phone}</p>
            </div>

            {/* Horario */}
            <div className="flex gap-12 border-t border-(--foreground-10) py-6">
              <span className="w-30 shrink-0 text-xs tracking-[0.2em] text-(--primary-70) uppercase">Schedule</span>
              <div className="space-y-1.5 text-sm">
                <div className="flex gap-8">
                  <span className="text-foreground w-36">Monday — Friday</span>
                  <span className="text-(--foreground-60)">10:00 — 14:00 · 16:00 — 20:00</span>
                </div>
                <div className="flex gap-8">
                  <span className="text-foreground w-36">Saturday</span>
                  <span className="text-(--foreground-60)">10:00 — 14:00</span>
                </div>
                <div className="flex gap-8">
                  <span className="text-foreground w-36">Sunday</span>
                  <span className="text-(--foreground-60)">Closed</span>
                </div>
              </div>
            </div>

            {/* Redes */}
            <div className="flex gap-12 border-t border-b border-(--foreground-10) py-6">
              <span className="w-30 shrink-0 text-xs tracking-[0.2em] text-(--primary-70) uppercase">Social Media</span>
              <p className="text-foreground text-sm">Instagram · @circolopopolare</p>
            </div>
          </div>

          <div className="mt-10">
            <a
              target="__blank"
              href={block.ctaLink}
              className="bg-primary text-primary-foreground px-8 py-4 text-xs tracking-[0.2em] uppercase transition-colors hover:opacity-90">
              {block.ctaText}
            </a>
          </div>
        </div>

        {/* Right: Map */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d620.6958523025477!2d-0.13451297141411575!3d51.517189498231176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ba809fd882b%3A0x817eee82a924ec96!2sCircolo%20Popolare!5e0!3m2!1sen!2ses!4v1781019604772!5m2!1sen!2ses"
          className="flex aspect-square w-120 flex-1 border-0 opacity-80"
          loading="lazy"></iframe>
      </div>
    </section>
  );
}
