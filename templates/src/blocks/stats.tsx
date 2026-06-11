/** @jsxRuntime automatic @jsxImportSource react */
import type { StatsBlock } from '../types';

export function Stats({ block }: { block: StatsBlock }) {
  return (
    <section className="flex justify-around border-y border-(--foreground-10)">
      {block.stats.map((stat, i) => (
        <div key={i} className="flex-1 border-l border-(--foreground-10) px-10 py-8 text-center first:border-l-0">
          <div className="text-primary text-3xl italic">{stat.value}</div>
          <div className="mt-2 text-xs tracking-[0.2em] text-(--foreground-40) uppercase">{stat.label}</div>
        </div>
      ))}
    </section>
  );
}
