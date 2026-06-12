/** @jsxRuntime automatic @jsxImportSource react */
import type { InfoBlock } from '../types';

export function Info({ block }: { block: InfoBlock }) {
  return (
    <section id={block.nav} className="flex justify-center py-24">
      <div className="flex w-250 flex-col">
        <p className="text-primary text-xs tracking-[0.25em] uppercase">— {block.nav}</p>
        <h2 className="mt-4 text-5xl">{block.title}</h2>

        <div className="mt-20 flex gap-20">
          <div className="flex flex-1 flex-col gap-10">
            <blockquote className="border-primary text-foreground/70 border-l-2 pl-6 text-lg italic">{block.text1}</blockquote>
            <p className="text-foreground/60 whitespace-pre-line">{block.text2}</p>
          </div>

          <img src={block.imageUrl} className="h-130 w-130 object-cover opacity-80" />
        </div>
      </div>
    </section>
  );
}
