/** @jsxRuntime automatic @jsxImportSource react */
import { getNavLinks } from '../core/utils';
import type { WebsiteData } from '../types';

export function Nav({ data }: { data: WebsiteData }) {
  const block = data.blocks.nav;

  const navLinks = getNavLinks(data);

  return (
    <nav className="border-border fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b px-6 py-5 opacity-90 backdrop-blur-sm md:px-10">
      <a className="text-xs tracking-[0.25em] uppercase" href="#home">
        {data.blocks.name}
      </a>

      <div className="hidden items-center gap-8 md:flex">
        {navLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            className="hover:text-foreground text-foreground/70 text-xs tracking-[0.15em] uppercase transition-colors">
            {link.label}
          </a>
        ))}
      </div>

      {block.ctaText && (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={block.ctaLink}
          className="bg-primary text-primary-foreground px-6 py-2 text-xs tracking-[0.2em] uppercase transition-all hover:opacity-80">
          {block.ctaText}
        </a>
      )}
    </nav>
  );
}
