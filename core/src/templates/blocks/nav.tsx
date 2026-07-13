/** @jsxRuntime automatic @jsxImportSource react */
import type { ExtendedTemplateData } from '../types';

interface Props {
  data: ExtendedTemplateData;
}

export function Nav({ data }: Props) {
  const block = data.blocks.nav;

  return (
    <nav className="border-border fixed top-0 right-0 left-0 z-50 flex items-center justify-between border-b px-6 py-5 opacity-90 backdrop-blur-sm md:px-10">
      <a className="text-xs tracking-[0.25em] uppercase" href={data.domain}>
        {block.logoUrl ? <img src={block.logoUrl} alt={data.blocks.name} className="h-8 w-auto object-contain" /> : data.blocks.name}
      </a>

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
