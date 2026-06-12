/** @jsxRuntime automatic @jsxImportSource react */
import { getNavLinks } from '../core/utils';
import type { FooterBlock, WebsiteData } from '../types';

export function Footer({ data, block }: { data: WebsiteData; block: FooterBlock }) {
  const navLinks = getNavLinks(data);

  // This is to generate rich results for machines
  // https://search.google.com/test/rich-results
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.blocks.name,
    address: block.formattedAddress,
    telephone: block.phone,
  });

  return (
    <footer className="px-24 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <div className="flex">
        {/* Logo + description */}
        <div className="flex-1">
          <div className="mb-5 flex items-center gap-3">
            <span className="text-foreground text-xs tracking-[0.25em] uppercase">{data.blocks.name}</span>
          </div>
          <p className="text-xs leading-relaxed text-(--foreground-40)">{block.description}</p>
        </div>

        <Column title="Navigate" links={navLinks} />

        <Column
          title="Contact"
          links={[
            { label: block.phone, url: `tel:${block.phone.replace(/\s/g, '')}` },
            { label: block.formattedAddress, url: '' },
          ]}
        />

        <Column title="Booking &amp; Social" links={block.links} />
      </div>

      {/* Copyright + legal */}
      <div className="mt-12 flex items-center justify-between border-t border-(--foreground-10) pt-6">
        <p className="text-xs text-(--foreground-40)">
          © {new Date().getFullYear()} {data.blocks.name}
        </p>
        {block.legalLinks.length > 0 && (
          <ul className="flex flex-wrap gap-6">
            {block.legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.url} className="hover:text-foreground text-xs text-(--foreground-40) transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
}

function Column({ title, links }: { title: string; links: Array<{ label: string; url: string }> }) {
  if (links.length === 0) return;

  return (
    <div className="flex-1 flex-col gap-2 text-center">
      <p className="text-primary mb-2 text-xs tracking-[0.2em] uppercase">{title}</p>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <a target="__blank" href={link.url} className="hover:text-foreground text-xs text-(--foreground-40) transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
