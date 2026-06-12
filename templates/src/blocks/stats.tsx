/** @jsxRuntime automatic @jsxImportSource react */
import type { StatsBlock } from '../types';

export function Stats({ block }: { block: StatsBlock }) {
  return (
    <section className="border-foreground/10 flex justify-around border-y">
      {block.stats.map((stat, i) => (
        <div key={i} className="border-foreground/10 flex-1 border-l px-10 py-8 text-center first:border-l-0">
          <div className="text-primary text-3xl italic">{stat.value}</div>
          <div className="text-foreground/40 mt-2 text-xs tracking-[0.2em] uppercase">{stat.label}</div>
        </div>
      ))}
    </section>
  );
}
