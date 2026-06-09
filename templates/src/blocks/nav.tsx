import React from 'react';
import type { WebsiteData } from '../types';

export function Nav({ data }: { data: WebsiteData }) {
  const navLinks = [
    { label: data.blocks.aboutUs.nav, href: '#about' },
    { label: data.blocks.gallery.nav, href: '#gallery' },
    { label: data.blocks.reviews.nav, href: '#reviews' },
    { label: data.blocks.services.nav, href: '#services' },
    { label: data.blocks.location.nav, href: '#location' },
  ];

  return (
    <nav className="border-primary fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b px-10 py-5 backdrop-blur-sm">
      <a className="text-xs tracking-[0.25em] uppercase" href="#home">
        {data.blocks.nav.name}
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
        href={data.blocks.nav.ctaLink}
        className="bg-primary text-primary-foreground px-6 py-2 text-xs tracking-[0.2em] uppercase transition-all hover:opacity-80">
        {data.blocks.nav.ctaText}
      </a>
    </nav>
  );
}
