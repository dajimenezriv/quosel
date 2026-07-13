import type { Website } from '@/api/websites/use-get-website';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEditorStore } from '@/core/editor/use-editor-store';
import { cn } from '@/lib/utils';
import { WEEKDAYS, type Blocks } from '@quosel/core/templates';
import { produce } from 'immer';
import { Plus, Trash2 } from 'lucide-react';
import { Subgroup } from '../utils';

export function OpeningHours({ data }: { data: Website }) {
  const updateDraft = useEditorStore((s) => s.updateDraft);

  const updateHours = (fn: (hours: Blocks['hours']) => void) => {
    updateDraft(
      produce(data, (draft) => {
        fn(draft.blocks.hours);
      }),
    );
  };

  return (
    <Subgroup title="Opening hours">
      <p className="text-muted-foreground text-[11px] leading-relaxed">
        Shown in the Location section and sent to search engines as opening hours. A row with no times is shown as closed.
      </p>

      {data.blocks.hours.map((entry, i) => (
        <div key={i} className="border-input flex flex-col gap-2 rounded-md border p-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {WEEKDAYS.map((day) => (
                <button
                  key={day}
                  onClick={() =>
                    updateHours((hours) => {
                      const { days } = hours[i]!;
                      const at = days.indexOf(day);
                      if (at === -1) days.push(day);
                      else days.splice(at, 1);
                    })
                  }
                  className={cn(
                    'cursor-pointer rounded px-1.5 py-0.5 text-[11px] transition-colors',
                    entry.days.includes(day)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:text-foreground',
                  )}>
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
            <button
              onClick={() =>
                updateHours((hours) => {
                  hours.splice(i, 1);
                })
              }
              className="text-muted-foreground hover:text-destructive cursor-pointer">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {entry.intervals.map((interval, j) => (
            <div key={j} className="flex items-center gap-2">
              <Input
                type="time"
                value={interval.opens}
                onChange={(e) =>
                  updateHours((hours) => {
                    hours[i]!.intervals[j]!.opens = e.target.value;
                  })
                }
              />
              <span className="text-muted-foreground text-xs">—</span>
              <Input
                type="time"
                value={interval.closes}
                onChange={(e) =>
                  updateHours((hours) => {
                    hours[i]!.intervals[j]!.closes = e.target.value;
                  })
                }
              />
              <button
                onClick={() =>
                  updateHours((hours) => {
                    hours[i]!.intervals.splice(j, 1);
                  })
                }
                className="text-muted-foreground hover:text-destructive cursor-pointer">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              updateHours((hours) => {
                hours[i]!.intervals.push({ opens: '09:00', closes: '17:00' });
              })
            }>
            <Plus className="h-4 w-4" />
            {entry.intervals.length === 0 ? 'Add times (closed until you do)' : 'Add another shift'}
          </Button>
        </div>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          updateHours((hours) => {
            hours.push({ days: [], intervals: [] });
          })
        }>
        <Plus className="h-4 w-4" />
        Add days
      </Button>
    </Subgroup>
  );
}
