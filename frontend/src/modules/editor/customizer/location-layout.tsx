import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { LocationBlock, WebsiteData } from '@quosel/templates';
import { MapPin, Plus, Trash2 } from 'lucide-react';
import { useBlockHandlers } from './use-block-handlers';
import { Field, Section, Subgroup } from './utils';

interface Props {
  data: WebsiteData;
  block: LocationBlock;
  index: number;
}

export function LocationLayout({ data, block, index }: Props) {
  const { updateBlock, handleInput, handleTextArea, removeBlock, moveUp, moveDown } = useBlockHandlers<LocationBlock>(data, index);

  return (
    <Section title="Location" icon={<MapPin className="h-4 w-4" />} onMoveUp={moveUp} onMoveDown={moveDown} onRemove={removeBlock}>
      <Field label="Navigation Label">
        <Input
          value={block.nav}
          onChange={handleInput((block, value) => {
            block.nav = value;
          })}
        />
      </Field>
      <Field label="Title">
        <Textarea
          className="min-h-0"
          value={block.title}
          onChange={handleTextArea((block, value) => {
            block.title = value;
          })}
        />
      </Field>
      <Field label="Map URL">
        <Input
          value={block.mapUrl}
          onChange={handleInput((block, value) => {
            block.mapUrl = value;
          })}
        />
      </Field>
      <Subgroup title="Details">
        {block.details.map((detail, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input
              placeholder="Label"
              value={detail.label}
              onChange={handleInput((block, value) => {
                block.details[i].label = value;
              })}
            />
            <Input
              placeholder="Value"
              value={detail.value}
              onChange={handleInput((block, value) => {
                block.details[i].value = value;
              })}
            />
            <button
              onClick={() =>
                updateBlock((block) => {
                  block.details.splice(i, 1);
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
              block.details.push({ label: '', value: '' });
            })
          }>
          <Plus className="h-4 w-4" />
          Add detail
        </Button>
      </Subgroup>

      <Subgroup title="Schedule">
        <Field label="Title">
          <Input
            value={block.schedule.title}
            onChange={handleInput((block, value) => {
              block.schedule.title = value;
            })}
          />
        </Field>
        {block.schedule.items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input
              placeholder="Label"
              value={item.label}
              onChange={handleInput((block, value) => {
                block.schedule.items[i].label = value;
              })}
            />
            <Input
              placeholder="Value"
              value={item.value}
              onChange={handleInput((block, value) => {
                block.schedule.items[i].value = value;
              })}
            />
            <button
              onClick={() =>
                updateBlock((block) => {
                  block.schedule.items.splice(i, 1);
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
              block.schedule.items.push({ label: '', value: '' });
            })
          }>
          <Plus className="h-4 w-4" />
          Add row
        </Button>
      </Subgroup>

      <Subgroup title="Call to Action">
        <div className="flex items-center gap-2">
          <Field label="Button Text">
            <Input
              value={block.ctaText}
              onChange={handleInput((block, value) => {
                block.ctaText = value;
              })}
            />
          </Field>
          <Field label="Button Link">
            <Input
              value={block.ctaLink}
              onChange={handleInput((block, value) => {
                block.ctaLink = value;
              })}
            />
          </Field>
        </div>
      </Subgroup>
    </Section>
  );
}
