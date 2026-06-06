import type { WebsiteData } from "../types";
import { SERIF } from "../utils";

export function Location({ data }: { data: WebsiteData }) {
  return (
    <section
      id="location"
      className="grid grid-cols-1 bg-[var(--background)] md:grid-cols-2"
    >
      {/* Left: info */}
      <div className="px-6 py-12 md:px-24 md:py-20">
        <p className="mb-6 text-xs tracking-[0.25em] uppercase text-[var(--primary)]">
          — Visítanos
        </p>
        <h2
          className="mb-8 text-5xl font-light leading-tight text-[var(--foreground)] md:mb-14 md:text-7xl"
          style={{ fontFamily: SERIF }}
        >
          {data.place.formattedAddress.split(",")[0]?.trim()},{" "}
          <em className="italic text-[var(--primary)]">
            {data.place.formattedAddress.split(",")[1]?.trim()}
          </em>
          .
        </h2>

        <div>
          {/* Dirección */}
          <div className="flex gap-12 border-t border-[var(--foreground-10)] py-6">
            <span className="w-20 shrink-0 text-xs tracking-[0.2em] uppercase text-[var(--primary-70)]">
              Dirección
            </span>
            <div>
              <p className="text-sm text-[var(--foreground)]">
                {data.place.formattedAddress
                  .split(",")
                  .slice(0, 2)
                  .join(",")
                  .trim()}{" "}
                — bajo
              </p>
              <p className="mt-1 text-xs text-[var(--foreground-40)]">
                {data.place.formattedAddress
                  .split(",")
                  .slice(2)
                  .join(",")
                  .trim()}
              </p>
            </div>
          </div>

          {/* Teléfono */}
          {data.place.internationalPhoneNumber && (
            <div className="flex gap-12 border-t border-[var(--foreground-10)] py-6">
              <span className="w-20 shrink-0 text-xs tracking-[0.2em] uppercase text-[var(--primary-70)]">
                Teléfono
              </span>
              <div>
                <p className="text-sm text-[var(--foreground)]">
                  {data.place.internationalPhoneNumber}
                </p>
                <p className="mt-1 text-xs text-[var(--foreground-40)]">
                  WhatsApp · reservas y consultas
                </p>
              </div>
            </div>
          )}

          {/* Horario */}
          <div className="flex gap-12 border-t border-[var(--foreground-10)] py-6">
            <span className="w-20 shrink-0 text-xs tracking-[0.2em] uppercase text-[var(--primary-70)]">
              Horario
            </span>
            <div className="space-y-1.5 text-sm">
              <div className="flex gap-8">
                <span className="w-36 text-[var(--foreground)]">
                  Lunes — Viernes
                </span>
                <span className="text-[var(--foreground-60)]">
                  10:00 — 14:00 · 16:00 — 20:00
                </span>
              </div>
              <div className="flex gap-8">
                <span className="w-36 text-[var(--foreground)]">Sábado</span>
                <span className="text-[var(--foreground-60)]">
                  10:00 — 14:00
                </span>
              </div>
              <div className="flex gap-8">
                <span className="w-36 text-[var(--primary)]">Domingo</span>
                <span className="text-[var(--primary)]">Cerrado</span>
              </div>
            </div>
          </div>

          {/* Reservas */}
          <div className="flex gap-12 border-t border-[var(--foreground-10)] py-6">
            <span className="w-20 shrink-0 text-xs tracking-[0.2em] uppercase text-[var(--primary-70)]">
              Reservas
            </span>
            <p className="text-sm text-[var(--foreground)]">
              Booksy · barberodebenimaclet
            </p>
          </div>

          {/* Redes */}
          <div className="flex gap-12 border-t border-b border-[var(--foreground-10)] py-6">
            <span className="w-20 shrink-0 text-xs tracking-[0.2em] uppercase text-[var(--primary-70)]">
              Redes
            </span>
            <p className="text-sm text-[var(--foreground)]">
              Instagram · @barberobenimaclet
            </p>
          </div>
        </div>

        <div className="mt-10">
          <a
            href="#"
            className="bg-[var(--primary)] px-8 py-4 text-xs tracking-[0.2em] uppercase text-[var(--primary-foreground)] transition-colors hover:opacity-90"
          >
            Reservar Cita →
          </a>
        </div>
      </div>

      {/* Right: Map */}
      <iframe
        src={`https://maps.google.com/maps?q=${encodeURIComponent(data.place.formattedAddress)}&output=embed`}
        className="min-h-80 w-full border-0 md:h-full"
        loading="lazy"
      />
    </section>
  );
}
