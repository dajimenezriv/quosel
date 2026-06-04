import type { WebsiteData } from "../types";
import { SERIF } from "../utils";

export function Hero({ data }: { data: WebsiteData }) {
  return (
    <section className="relative flex min-h-screen items-center">
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[var(--popover)]" />
      </div>

      <div className="relative z-10 px-6 pb-24 md:px-24">
        <h1 className="leading-none" style={{ fontFamily: SERIF }}>
          <span className="block text-5xl font-light text-[var(--foreground)] md:text-7xl lg:text-8xl">
            Tu barbero,
          </span>
          <span className="block text-5xl font-light italic text-[var(--primary)] md:text-7xl lg:text-8xl">
            {data.place.name}.
          </span>
        </h1>

        {data.place.formattedAddress && (
          <p
            className="mt-8 max-w-xs text-base italic text-[var(--foreground-70)] md:max-w-sm"
            style={{ fontFamily: SERIF }}
          >
            {data.place.formattedAddress}
            {data.place.rating !== null && (
              <>
                {" "}
                · ★ {data.place.rating} ({data.place.userRatingCount} reseñas)
              </>
            )}
          </p>
        )}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="#"
            className="bg-[var(--primary)] px-8 py-3 text-center text-xs tracking-[0.25em] uppercase text-[var(--primary-foreground)] transition-colors hover:opacity-90"
          >
            Reservar Cita
          </a>
          {data.place.internationalPhoneNumber && (
            <a
              href={`tel:${data.place.internationalPhoneNumber}`}
              className="border border-[var(--foreground-40)] px-8 py-3 text-center text-xs tracking-[0.2em] uppercase transition-colors hover:border-[var(--foreground)]"
            >
              {data.place.internationalPhoneNumber}
            </a>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
        <span className="text-xs tracking-[0.3em] uppercase text-[var(--foreground-40)]">
          Scroll
        </span>
        <div className="h-12 w-px bg-[var(--foreground-30)]" />
      </div>
    </section>
  );
}
