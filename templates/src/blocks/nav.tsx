import React from 'react';
import type { WebsiteData } from '../types';

export function Nav({ data }: { data: WebsiteData }) {
  const block = data.blocks.nav;

  const navLinks: Array<{ label: string; href: string }> = [];

  for (const b of data.blocks.blocks) {
    if ('nav' in b) {
      navLinks.push({ label: b.nav, href: `#${b.nav}` });
    }
  }

  return (
    <nav className="border-border fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b px-10 py-5 opacity-90 backdrop-blur-sm">
      <a className="text-xs tracking-[0.25em] uppercase" href="#home">
        {block.name}
      </a>

      <div className="hidden items-center gap-8 md:flex">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="hover:text-foreground text-xs tracking-[0.15em] text-(--foreground-70) uppercase transition-colors">
            {link.label}
          </a>
        ))}
      </div>

      <a
        target="__blank"
        href={block.ctaLink}
        className="bg-primary text-primary-foreground px-6 py-2 text-xs tracking-[0.2em] uppercase transition-all hover:opacity-80">
        {block.ctaText}
      </a>
    </nav>
  );
}
