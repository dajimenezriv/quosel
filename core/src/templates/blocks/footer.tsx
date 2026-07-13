/** @jsxRuntime automatic @jsxImportSource react */
import { RichText } from '../core/rich-text';
import { addressHref, pageHref, telHref } from '../core/utils';
import type { ExtendedTemplateData, FooterBlock } from '../types';

type Links = Array<{ label: string; url: string }>;

export function Footer({ data, block }: { data: ExtendedTemplateData; block: FooterBlock }) {
  const serviceLinks: Links = data.blocks.pages.map((page) => ({ label: page.h1, url: pageHref(data, page.slug) }));

  const links: Links = [];

  if (data.blocks.phone) links.push({ label: data.blocks.phone, url: telHref(data.blocks.phone) });
  if (data.formattedAddress) links.push({ label: data.formattedAddress, url: addressHref(data.blocks.address) });

  return (
    <footer className="px-6 py-12 md:px-24 md:py-16">
      <div className="flex flex-col gap-10 md:flex-row md:gap-0">
        <div className="flex-1">
          <div className="mb-5 flex items-center gap-3">
            <span className="text-xs tracking-[0.25em] uppercase">{data.blocks.name}</span>
          </div>
          <p className="text-foreground/40 text-xs leading-relaxed">
            <RichText text={block.description} />
          </p>
        </div>

        <Column title="Services" links={serviceLinks} external={false} />
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

function Column({ title, links, external = true }: { title: string; links: Links; external?: boolean }) {
  if (links.length === 0) return null;

  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <div className="flex-1 flex-col gap-2 md:text-center">
      <p className="text-primary mb-2 text-xs tracking-[0.2em] uppercase">{title}</p>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <a {...externalProps} href={link.url} className="hover:text-foreground text-foreground/40 text-xs transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
