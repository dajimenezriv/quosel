import React from "react";
import type { WebsiteData } from "../types";
import { SERIF } from "../utils";

export function About({ data }: { data: WebsiteData }) {
  return (
    <section
      id="about"
      className="grid gap-8 bg-[var(--card)] px-6 py-12 md:gap-16 md:px-24 md:py-24 md:grid-cols-2"
    >
      <div>
        <p className="mb-6 text-xs tracking-[0.25em] uppercase text-[var(--primary)]">
          — {data.blocks.aboutUs.nav}
        </p>
        <h2
          className="text-5xl font-light leading-tight"
          style={{ fontFamily: SERIF }}
        >
          Una barbería{" "}
          <em className="italic text-[var(--primary)]">{data.place.name}</em>,
          para el barrio.
        </h2>
        <blockquote
          className="mt-10 border-l-2 border-[var(--primary)] pl-6 text-lg italic text-[var(--foreground-70)]"
          style={{ fontFamily: SERIF }}
        >
          Cortes de calidad, atención personalizada y el ambiente del barrio.
          Sin prisas, sin trámites, sin sorpresas.
        </blockquote>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--foreground-60)]">
          <p>
            Llevamos años haciendo lo mismo:{" "}
            <span className="text-[var(--primary)]">
              cortes precisos, barbas trabajadas con calma y un acabado que se
              nota a la mano.
            </span>{" "}
            Cada cliente, un caso. Cada visita, un trato cercano.
          </p>
          <p>
            Por la silla pasan vecinos de toda la vida, estudiantes, padres con
            sus hijos y gente que viene desde otros barrios buscando un corte
            que dure. Nos preocupa más tu próxima visita que la caja de hoy.
          </p>
          {data.place.formattedAddress && (
            <p>
              Reserva online o ven a conocernos. Estamos en{" "}
              <span className="text-[var(--primary)]">
                {data.place.formattedAddress}
              </span>
              .
            </p>
          )}
        </div>
      </div>

      <div className="relative min-h-80 bg-[var(--muted)]">
        {data.blocks.aboutUs.imageUrl && (
          <img
            src={data.blocks.aboutUs.imageUrl}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
        )}
      </div>
    </section>
  );
}
