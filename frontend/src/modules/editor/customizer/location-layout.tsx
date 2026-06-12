import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { LocationBlock, WebsiteData } from '@quosel/templates';
import { MapPin } from 'lucide-react';
import { useBlockHandlers } from './use-block-handlers';
import { Field, Section, Subgroup } from './utils';

interface Props {
  data: WebsiteData;
  block: LocationBlock;
  index: number;
}

export function LocationLayout({ data, block, index }: Props) {
  const { handleInput, handleTextArea, removeBlock, moveUp, moveDown } = useBlockHandlers<LocationBlock>(data, index);

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
      <Field label="Address">
        <Input
          value={block.formattedAddress}
          onChange={handleInput((block, value) => {
            block.formattedAddress = value;
          })}
        />
      </Field>
      <Field label="Phone">
        <Input
          value={block.phone ?? ''}
          onChange={handleInput((block, value) => {
            block.phone = value;
          })}
        />
      </Field>

      <Subgroup title="Call to Action">
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
      </Subgroup>
    </Section>
  );
}
