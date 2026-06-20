import type { Website } from '@/api/websites/use-get-website';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { StatsBlock } from '@quosel/core/templates';
import { BarChart3, Plus, Trash2 } from 'lucide-react';
import { useBlockHandlers } from './use-block-handlers';
import { Section } from './utils';

interface Props {
  data: Website;
  block: StatsBlock;
  index: number;
}

export function StatsLayout({ data, block, index }: Props) {
  const { handleInput, updateBlock, removeBlock, moveUp, moveDown } = useBlockHandlers<StatsBlock>(data, index);

  return (
    <Section title="Stats" icon={<BarChart3 className="h-4 w-4" />} onMoveUp={moveUp} onMoveDown={moveDown} onRemove={removeBlock}>
      {block.stats.map((stat, statIndex) => (
        <div key={statIndex} className="flex items-center gap-2">
          <Input
            placeholder="Value"
            value={stat.value}
            onChange={handleInput((block, value) => {
              block.stats[statIndex]!.value = value;
            })}
          />
          <Input
            placeholder="Label"
            value={stat.label}
            onChange={handleInput((block, value) => {
              block.stats[statIndex]!.label = value;
            })}
          />
          <button
            onClick={() =>
              updateBlock((block) => {
                block.stats.splice(statIndex, 1);
              })
            }
            className="text-muted-foreground hover:text-destructive cursor-pointer">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          updateBlock((block) => {
            block.stats.push({ value: '', label: '' });
          })
        }>
        <Plus className="h-4 w-4" />
        Add stat
      </Button>
    </Section>
  );
}
