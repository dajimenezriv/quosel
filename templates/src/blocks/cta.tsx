import React from 'react';

export function CTA() {
  return (
    <section id="cta" className="relative flex min-h-96 items-center justify-center py-32 text-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url('https://cdn.sanity.io/images/aa3sekul/production/070dc569421cc19978858573b22ed27813435efb-7243x4831.jpg?w=3072&fit=crop&auto=format')",
        }}
      />
      <div className="relative z-10 max-w-2xl px-6 md:px-8">
        <h2 className="text-primary text-4xl leading-tight italic md:text-6xl">Tu próxima cita empieza aquí.</h2>
        <p className="mt-6 text-sm leading-relaxed text-(--foreground-60)">
          Reserva en Booksy o síguenos en Instagram. Las dos puertas para entrar en la barbería antes incluso de cruzarla.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href="#"
            className="bg-primary text-primary-foreground px-8 py-4 text-center text-xs tracking-[0.2em] uppercase transition-colors hover:opacity-90">
            Reservar en Booksy →
          </a>
          <a
            href="#"
            className="text-foreground hover:border-foreground border border-(--foreground-40) px-8 py-4 text-center text-xs tracking-[0.2em] uppercase transition-colors">
            Seguir en Instagram →
          </a>
        </div>
      </div>
    </section>
  );
}
