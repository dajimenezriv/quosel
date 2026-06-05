import type { WebsiteData } from "../types";

const NAV_LINKS = [
  { label: "Sobre Nosotros", href: "#about" },
  { label: "Galería", href: "#gallery" },
  { label: "Reseñas", href: "#reviews" },
  { label: "Servicios", href: "#services" },
  { label: "Visítanos", href: "#location" },
];

export function Navigation({ data }: { data: WebsiteData }) {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-10 py-5 bg-[var(--background)]/80 backdrop-blur-sm border-border border-b">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--primary)]">
          <span className="text-xs font-light tracking-wider text-[var(--primary)]">
            {data.blocks.nav.logo}
          </span>
        </div>
        <span className="text-xs tracking-[0.25em] uppercase">
          {data.place.name}
        </span>
      </div>

      <div className="hidden items-center gap-8 md:flex">
        {data.blocks.nav.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-xs tracking-[0.15em] uppercase text-[var(--foreground-70)] transition-colors hover:text-[var(--foreground)]"
          >
            {link.label}
          </a>
        ))}
      </div>

      <a
        target="__blank"
        href={data.blocks.nav.ctaLink}
        className="border border-[var(--primary)] px-6 py-2 text-xs tracking-[0.2em] uppercase text-[var(--primary)] transition-all hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]"
      >
        {data.blocks.nav.ctaText}
      </a>
    </nav>
  );
}
