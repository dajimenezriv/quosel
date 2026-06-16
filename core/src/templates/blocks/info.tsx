/** @jsxRuntime automatic @jsxImportSource react */
import { RichText } from '../core/rich-text';
import { slugify } from '../core/utils';
import type { InfoBlock } from '../types';

export function Info({ block }: { block: InfoBlock }) {
  return (
    <section id={slugify(block.nav)} className="flex justify-center px-6 py-24 md:px-0">
      <div className="flex w-full max-w-250 flex-col">
        <p className="text-primary text-xs tracking-[0.25em] uppercase">— {block.nav}</p>
        <h2 className="mt-4 text-5xl">
          <RichText text={block.title} />
        </h2>

        <div className="mt-10 flex flex-col gap-10 md:mt-20 md:flex-row md:gap-20">
          <div className="flex flex-1 flex-col gap-10">
            <blockquote className="border-primary text-foreground/70 border-l-2 pl-6 text-lg">
              <RichText text={block.text1} />
            </blockquote>
            <p className="text-foreground/60">
              <RichText text={block.text2} />
            </p>
          </div>

          <img src={block.imageUrl} className="aspect-square w-full object-cover opacity-80 md:aspect-auto md:h-130 md:w-130" />
        </div>
      </div>
    </section>
  );
}
