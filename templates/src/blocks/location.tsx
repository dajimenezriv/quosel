import React from 'react';
import type { WebsiteData } from '../types';

export function Location({ data }: { data: WebsiteData }) {
  return (
    <section id="location" className="bg-[var(--background)]">
      <div className="flex">
        {/* Left: info */}
        <div className="px-6 py-12 md:px-24 md:py-20">
          <p className="mb-6 text-xs tracking-[0.25em] text-[var(--primary)] uppercase">— Visítanos</p>
          <h2 className="mb-8 text-5xl leading-tight font-[var(--font-serif)] font-light text-[var(--foreground)] md:mb-14 md:text-7xl">
            {data.blocks.location.formattedAddress.split(',')[0]?.trim()},{' '}
            <em className="text-[var(--primary)] italic">{data.blocks.location.formattedAddress.split(',')[1]?.trim()}</em>.
          </h2>

          <div>
            {/* Dirección */}
            <div className="flex gap-12 border-t border-[var(--foreground-10)] py-6">
              <span className="w-20 shrink-0 text-xs tracking-[0.2em] text-[var(--primary-70)] uppercase">Dirección</span>
              <div>
                <p className="text-sm text-[var(--foreground)]">
                  {data.blocks.location.formattedAddress.split(',').slice(0, 2).join(',').trim()} — bajo
                </p>
                <p className="mt-1 text-xs text-[var(--foreground-40)]">
                  {data.blocks.location.formattedAddress.split(',').slice(2).join(',').trim()}
                </p>
              </div>
            </div>

            {/* Teléfono */}
            {data.blocks.location.phone && (
              <div className="flex gap-12 border-t border-[var(--foreground-10)] py-6">
                <span className="w-20 shrink-0 text-xs tracking-[0.2em] text-[var(--primary-70)] uppercase">Teléfono</span>
                <div>
                  <p className="text-sm text-[var(--foreground)]">{data.blocks.location.phone}</p>
                  <p className="mt-1 text-xs text-[var(--foreground-40)]">WhatsApp · reservas y consultas</p>
                </div>
              </div>
            )}

            {/* Horario */}
            <div className="flex gap-12 border-t border-[var(--foreground-10)] py-6">
              <span className="w-20 shrink-0 text-xs tracking-[0.2em] text-[var(--primary-70)] uppercase">Horario</span>
              <div className="space-y-1.5 text-sm">
                <div className="flex gap-8">
                  <span className="w-36 text-[var(--foreground)]">Lunes — Viernes</span>
                  <span className="text-[var(--foreground-60)]">10:00 — 14:00 · 16:00 — 20:00</span>
                </div>
                <div className="flex gap-8">
                  <span className="w-36 text-[var(--foreground)]">Sábado</span>
                  <span className="text-[var(--foreground-60)]">10:00 — 14:00</span>
                </div>
                <div className="flex gap-8">
                  <span className="w-36 text-[var(--primary)]">Domingo</span>
                  <span className="text-[var(--primary)]">Cerrado</span>
                </div>
              </div>
            </div>

            {/* Reservas */}
            <div className="flex gap-12 border-t border-[var(--foreground-10)] py-6">
              <span className="w-20 shrink-0 text-xs tracking-[0.2em] text-[var(--primary-70)] uppercase">Reservas</span>
              <p className="text-sm text-[var(--foreground)]">Booksy · barberodebenimaclet</p>
            </div>

            {/* Redes */}
            <div className="flex gap-12 border-t border-b border-[var(--foreground-10)] py-6">
              <span className="w-20 shrink-0 text-xs tracking-[0.2em] text-[var(--primary-70)] uppercase">Redes</span>
              <p className="text-sm text-[var(--foreground)]">Instagram · @barberobenimaclet</p>
            </div>
          </div>

          <div className="mt-10">
            <a
              href="#"
              className="bg-[var(--primary)] px-8 py-4 text-xs tracking-[0.2em] text-[var(--primary-foreground)] uppercase transition-colors hover:opacity-90">
              Reservar Cita →
            </a>
          </div>
        </div>

        {/* Right: Map */}
        <iframe
          src={`https://maps.google.com/maps?q=${encodeURIComponent(data.blocks.location.formattedAddress)}&output=embed`}
          className="min-h-80 w-full border-0 md:h-full"
          loading="lazy"
        />
      </div>
    </section>
  );
}
