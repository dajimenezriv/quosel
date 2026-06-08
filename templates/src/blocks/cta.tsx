import React from 'react';

export function CTA() {
  return (
    <section id="cta" className="relative flex min-h-96 items-center justify-center py-32 text-center">
      <div className="absolute inset-0 bg-[var(--popover)]" />
      <div className="relative z-10 max-w-2xl px-6 md:px-8">
        <h2 className="text-4xl leading-tight font-[var(--font-serif)] font-light text-[var(--primary)] italic md:text-6xl">
          Tu próxima cita empieza aquí.
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-[var(--foreground-60)]">
          Reserva en Booksy o síguenos en Instagram. Las dos puertas para entrar en la barbería antes incluso de cruzarla.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href="#"
            className="bg-[var(--primary)] px-8 py-4 text-center text-xs tracking-[0.2em] text-[var(--primary-foreground)] uppercase transition-colors hover:opacity-90">
            Reservar en Booksy →
          </a>
          <a
            href="#"
            className="border border-[var(--foreground-40)] px-8 py-4 text-center text-xs tracking-[0.2em] text-[var(--foreground)] uppercase transition-colors hover:border-[var(--foreground)]">
            Seguir en Instagram →
          </a>
        </div>
      </div>
    </section>
  );
}
