import type { WebsiteData } from "../types";
import { SERIF } from "../utils";

const REVIEWS = [
  {
    text: "Llevo años yendo a esta barbería y la verdad que estoy tan contento como el primer día. Cuidan mucho del cliente, precios muy económicos y muy buen ambiente.",
    author: "Miguel Ángel S.",
    source: "Google",
  },
  {
    text: "Más de 2 años acudiendo a la barbería y un tratamiento perfecto y buen ambiente. 10/10.",
    author: "Álvaro M.",
    source: "Google",
  },
  {
    text: "La mejor barbería de Valencia. La atención muy buena y el corte perfecto. Repetiré sin duda.",
    author: "Adrián S.",
    source: "Booksy · Cliente Verificado",
  },
];

export function Reviews({ data }: { data: WebsiteData }) {
  return (
    <section className="bg-[var(--card)] px-6 py-12 md:px-24 md:py-20">
      <div className="mb-8 flex flex-col gap-6 md:mb-16 md:flex-row md:items-start md:justify-between md:gap-16">
        <div>
          <p className="mb-4 text-xs tracking-[0.25em] uppercase text-[var(--primary)]">
            — Opiniones
          </p>
          <h2
            className="text-5xl font-light text-[var(--foreground)]"
            style={{ fontFamily: SERIF }}
          >
            La voz <em className="italic text-[var(--primary)]">del cliente</em>
            .
          </h2>
        </div>

        <div className="shrink-0 border border-[var(--primary-30)] p-6">
          <div className="grid grid-cols-2 divide-x divide-[var(--primary-20)]">
            <div className="pr-8 text-center">
              <div
                className="text-4xl font-light italic text-[var(--primary)]"
                style={{ fontFamily: SERIF }}
              >
                {data.place.rating
                  ? data.place.rating.toString().replace(".", ",")
                  : "–"}
              </div>
              <div className="mt-1 text-[var(--primary)]">★★★★★</div>
              <div className="mt-2 text-xs tracking-[0.15em] uppercase text-[var(--foreground-30)]">
                Google · {data.place.userRatingCount ?? 0}
              </div>
            </div>
            <div className="pl-8 text-center">
              <div
                className="text-4xl font-light italic text-[var(--primary)]"
                style={{ fontFamily: SERIF }}
              >
                4,9
              </div>
              <div className="mt-1 text-[var(--primary)]">★★★★★</div>
              <div className="mt-2 text-xs tracking-[0.15em] uppercase text-[var(--foreground-30)]">
                Booksy · 324
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {REVIEWS.map((review) => (
          <div
            key={review.author}
            className="flex flex-col border border-[var(--foreground-10)] bg-[var(--popover)] p-8"
          >
            <div className="text-lg text-[var(--primary)]">★★★★★</div>
            <p
              className="mt-4 flex-1 text-sm italic leading-relaxed text-[var(--foreground-80)]"
              style={{ fontFamily: SERIF }}
            >
              "{review.text}"
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-[var(--foreground-10)] pt-4">
              <span className="text-xs tracking-[0.15em] uppercase text-[var(--foreground-30)]">
                {review.author}
              </span>
              <span className="text-xs tracking-[0.15em] uppercase text-[var(--foreground-25)]">
                {review.source}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
