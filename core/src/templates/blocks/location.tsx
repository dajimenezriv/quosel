/** @jsxRuntime automatic @jsxImportSource react */
import { RichText } from '../core/rich-text';
import { formatDays, formatIntervals, slugify } from '../core/utils';
import type { ExtendedTemplateData, LocationBlock } from '../types';

export function Location({ data, block }: { data: ExtendedTemplateData; block: LocationBlock }) {
  const details = [
    ...(data.formattedAddress ? [{ label: 'Address', value: data.formattedAddress }] : []),
    ...(data.blocks.phone ? [{ label: 'Phone', value: data.blocks.phone }] : []),
    ...block.details,
  ];

  return (
    <section id={slugify(block.nav)} className="bg-secondary text-foreground flex justify-center px-6 py-24 md:px-0">
      <div className="flex w-full max-w-300 flex-col gap-12 md:flex-row md:items-center md:gap-20">
        <div className="flex flex-1 flex-col">
          <p className="text-primary mb-6 text-xs tracking-[0.25em] uppercase">— {block.nav}</p>
          <h2 className="mb-8 text-5xl leading-tight md:mb-14 md:text-7xl">
            <RichText text={block.title} />
          </h2>

          <div>
            {details.map((detail, i) => (
              <div key={i} className="border-foreground/10 flex gap-12 border-t py-6">
                <span className="text-primary/70 w-30 shrink-0 text-xs tracking-[0.2em] uppercase">{detail.label}</span>
                <p className="text-sm">
                  <RichText text={detail.value} />
                </p>
              </div>
            ))}

            {data.blocks.hours.length > 0 && (
              <div className="border-foreground/10 flex flex-col gap-3 border-t py-6 md:flex-row md:gap-12">
                <span className="text-primary/70 w-30 shrink-0 text-xs tracking-[0.2em] uppercase">{block.schedule.title}</span>
                <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 text-sm md:block md:space-y-1.5">
                  {data.blocks.hours.map((entry, i) => (
                    <div key={i} className="contents md:flex md:gap-8">
                      <span className="md:w-36">{formatDays(entry.days)}</span>
                      <span>{formatIntervals(entry.intervals, block.schedule.closedLabel)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {block.ctaText && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={block.ctaLink}
              className="bg-primary text-primary-foreground mt-10 px-8 py-4 text-xs tracking-[0.2em] uppercase transition-colors hover:opacity-90">
              {block.ctaText}
            </a>
          )}
        </div>

        <iframe
          src={block.mapUrl}
          title={`${block.nav} map`}
          className="flex aspect-square w-full flex-1 border-0 opacity-80 md:w-120"
          loading="lazy"></iframe>
      </div>
    </section>
  );
}
