import { Input } from '@/components/ui/input';
import type { StatsBlock, WebsiteData } from '@quosel/templates';
import { BarChart3 } from 'lucide-react';
import { useBlockHandlers } from './use-block-handlers';
import { Field, Section, Subgroup } from './utils';

interface Props {
  data: WebsiteData;
  block: StatsBlock;
  index: number;
}

export function StatsLayout({ data, block, index }: Props) {
  const { handleInput } = useBlockHandlers<StatsBlock>(data, index);

  return (
    <Section title="Stats" icon={<BarChart3 className="h-4 w-4" />}>
      {block.stats.map((stat, statIndex) => (
        <Subgroup key={statIndex} title={`Stat ${statIndex + 1}`}>
          <Field label="Value">
            <Input
              value={stat.value}
              onChange={handleInput((block, value) => {
                block.stats[statIndex].value = value;
              })}
            />
          </Field>
          <Field label="Label">
            <Input
              value={stat.label}
              onChange={handleInput((block, value) => {
                block.stats[statIndex].label = value;
              })}
            />
          </Field>
        </Subgroup>
      ))}
    </Section>
  );
}
