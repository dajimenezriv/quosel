import React from 'react';
import { WebsiteData } from '../types';

export function Services({ data }: { data: WebsiteData }) {
  const block = data.blocks.services;

  return (
    <section id="services" className="bg-background px-6 py-12 md:px-24 md:py-20">
      {/* Header */}
      <div className="mb-8 grid gap-6 md:mb-16 md:grid-cols-2 md:items-start md:gap-16">
        <div>
          <p className="text-primary mb-4 text-xs tracking-[0.25em] uppercase">— Carta</p>
          <h2 className="text-foreground text-5xl leading-tight">
            Servicios <em className="text-primary italic">&amp;</em> precios.
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-(--foreground-50) italic md:pt-14">
          Reserva directo en Booksy: elige el servicio, el día y la hora. Sin sorpresas, sin letra pequeña.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {block.serviceGroups.map((group) => (
          <div key={group.title}>
            <div className="border-b border-(--primary-30) pb-2">
              <span className="text-primary text-xs tracking-[0.2em] uppercase">{group.title}</span>
            </div>

            <div>
              {group.services.map((item, i) => (
                <div key={item.title} className="flex flex-col">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex flex-col">
                      <p className="text-foreground text-base">{item.title}</p>
                      <p className="text-xs leading-relaxed text-(--foreground-40)">{item.text}</p>
                    </div>
                    <span className="text-primary text-right text-xl italic">{item.price}</span>
                  </div>
                  {i < group.services.length - 1 && <div className="border-t border-(--foreground-10)" />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-10 flex flex-col gap-4 border-t border-(--foreground-10) pt-8 md:mt-16 md:flex-row md:items-center md:justify-between">
        <p className="text-xs tracking-[0.2em] text-(--foreground-30) uppercase">Carta completa disponible en Booksy.</p>
        <a
          target="__blank"
          href={block.ctaLink}
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground border bg-(--primary-10) px-6 py-3 text-xs tracking-[0.2em] uppercase transition-all">
          {block.ctaText}
        </a>
      </div>
    </section>
  );
}
