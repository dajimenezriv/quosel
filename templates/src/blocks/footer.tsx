import type { WebsiteData } from "../types";
import { getInitials } from "../utils";

export function Footer({ data }: { data: WebsiteData }) {
  const initials = getInitials(data.place.name);

  return (
    <footer className="bg-[var(--card)] px-6 py-12 md:px-24 md:py-16">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
        {/* Logo + description */}
        <div className="col-span-2 md:col-span-1">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--primary)]">
              <span className="text-xs font-light tracking-wider text-[var(--primary)]">
                {initials}
              </span>
            </div>
            <span className="text-xs tracking-[0.25em] uppercase text-[var(--foreground)]">
              {data.place.name}
            </span>
          </div>
          <p className="text-xs leading-relaxed text-[var(--foreground-40)]">
            Barbería en el corazón del barrio. Cortes, degradados, barba y
            conversación. Reserva online o pásate a conocernos.
          </p>
        </div>

        {/* Navegar */}
        <div>
          <p className="mb-4 text-xs tracking-[0.2em] uppercase text-[var(--primary)]">
            Navegar
          </p>
          <ul className="space-y-2">
            {[
              "Sobre nosotros",
              "Barbero",
              "Servicios",
              "Galería",
              "Visitas",
              "Reseñas",
            ].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-xs text-[var(--foreground-40)] transition-colors hover:text-[var(--foreground)]"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <p className="mb-4 text-xs tracking-[0.2em] uppercase text-[var(--primary)]">
            Contacto
          </p>
          <div className="space-y-2">
            {data.place.internationalPhoneNumber && (
              <p className="text-xs font-medium text-[var(--foreground)]">
                {data.place.internationalPhoneNumber}
              </p>
            )}
            <p className="text-xs font-medium text-[var(--foreground)]">
              {data.place.formattedAddress
                .split(",")
                .slice(0, 2)
                .join(",")
                .trim()}
            </p>
            <p className="text-xs text-[var(--foreground-40)]">
              {data.place.formattedAddress
                .split(",")
                .slice(2, 3)
                .join(",")
                .trim()}
            </p>
          </div>
        </div>

        {/* Reserva & Redes */}
        <div className="col-span-2 md:col-span-1">
          <p className="mb-4 text-xs tracking-[0.2em] uppercase text-[var(--primary)]">
            Reserva &amp; Redes
          </p>
          <ul className="space-y-2">
            {["Booksy", "Instagram"].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-xs text-[var(--foreground-40)] transition-colors hover:text-[var(--foreground)]"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
