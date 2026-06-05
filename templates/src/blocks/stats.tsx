import type { WebsiteData } from "../types";
import { SERIF } from "../utils";

export function Stats({ data }: { data: WebsiteData }) {
  const stats = [
    {
      value: data.place.rating
        ? `${data.place.rating.toString().replace(".", ",")}★`
        : "–",
      label: `GOOGLE · ${data.place.userRatingCount ?? 0} RESEÑAS`,
    },
    { value: "4,9★", label: "BOOKSY · 324 RESEÑAS" },
    { value: "+1K", label: "SEGUIDORES EN INSTAGRAM" },
    { value: "L-S", label: "MAÑANA Y TARDE" },
  ];

  return (
    <section className="grid grid-cols-2 border-b border-t border-[var(--foreground-10)] bg-[var(--card)] md:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`px-10 py-8 text-center border-[var(--foreground-10)]${
            i % 2 === 0 ? " border-r" : ""
          }${i < 2 ? " border-b md:border-b-0" : ""}${
            i % 2 !== 0 && i < 3 ? " md:border-r" : ""
          }`}
        >
          <div
            className="text-3xl font-light italic text-[var(--primary)]"
            style={{ fontFamily: SERIF }}
          >
            {stat.value}
          </div>
          <div className="mt-2 text-xs tracking-[0.2em] uppercase text-[var(--foreground-40)]">
            {stat.label}
          </div>
        </div>
      ))}
    </section>
  );
}
