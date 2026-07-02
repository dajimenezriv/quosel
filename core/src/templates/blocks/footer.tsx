/** @jsxRuntime automatic @jsxImportSource react */
import { RichText } from '../core/rich-text';
import { getNavLinks } from '../core/utils';
import type { FooterBlock, TemplateData } from '../types';

type Links = Array<{ label: string; url: string }>;

export function Footer({ data, block }: { data: TemplateData; block: FooterBlock }) {
  const navLinks = getNavLinks(data);

  // This is to generate rich results for machines
  // https://search.google.com/test/rich-results
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.blocks.name,
    address: data.blocks.address,
    telephone: data.blocks.phone,
  });

  const links: Links = [];

  if (data.blocks.phone) links.push({ label: data.blocks.phone, url: `tel:${data.blocks.phone.replace(/\s/g, '')}` });
  if (data.blocks.address) links.push({ label: data.blocks.address, url: '' });

  return (
    <footer className="px-6 py-12 md:px-24 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

      <div className="flex flex-col gap-10 md:flex-row md:gap-0">
        <div className="flex-1">
          <div className="mb-5 flex items-center gap-3">
            <span className="text-xs tracking-[0.25em] uppercase">{data.blocks.name}</span>
          </div>
          <p className="text-foreground/40 text-xs leading-relaxed">
            <RichText text={block.description} />
          </p>
        </div>

        <Column title={block.navigateTitle} links={navLinks} />
        <Column title={block.contactTitle} links={links} />
        <Column title={block.linksTitle} links={block.links} />
      </div>

      <div className="border-foreground/10 mt-12 flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between">
        <p className="text-foreground/40 text-xs">
          © {new Date().getFullYear()} {data.blocks.name}
        </p>
        {block.legalLinks.length > 0 && (
          <ul className="flex flex-wrap gap-6">
            {block.legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.url} className="hover:text-foreground text-foreground/40 text-xs transition-colors">
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

function Column({ title, links }: { title: string; links: Links }) {
  if (links.length === 0) return null;

  return (
    <div className="flex-1 flex-col gap-2 md:text-center">
      <p className="text-primary mb-2 text-xs tracking-[0.2em] uppercase">{title}</p>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={link.url}
              className="hover:text-foreground text-foreground/40 text-xs transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
