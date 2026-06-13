/** @jsxRuntime automatic @jsxImportSource react */
import type { StatsBlock } from '../types';

export function Stats({ block }: { block: StatsBlock }) {
  return (
    <section className="border-foreground/10 grid grid-cols-2 border-y md:flex md:justify-around">
      {block.stats.map((stat, i) => (
        <div
          key={i}
          className="border-foreground/10 flex-1 px-4 py-6 text-center even:border-l last:odd:col-span-2 nth-[n+3]:border-t md:border-l md:px-10 md:py-8 md:first:border-l-0 md:nth-[n+3]:border-t-0">
          <div className="text-primary text-2xl italic md:text-3xl">{stat.value}</div>
          <div className="text-foreground/40 mt-2 text-xs tracking-[0.2em] uppercase">{stat.label}</div>
        </div>
      ))}
    </section>
  );
}
