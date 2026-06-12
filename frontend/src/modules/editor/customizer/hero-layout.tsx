import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { HeroBlock, WebsiteData } from '@quosel/templates';
import { Type } from 'lucide-react';
import { ImageField } from './image-field';
import { useBlockHandlers } from './use-block-handlers';
import { Field, Section, Subgroup } from './utils';

interface Props {
  data: WebsiteData;
  block: HeroBlock;
  index: number;
}

export function HeroLayout({ data, block, index }: Props) {
  const { updateBlock, handleInput, handleTextArea, removeBlock, moveUp, moveDown } = useBlockHandlers<HeroBlock>(data, index);

  return (
    <Section title="Hero" icon={<Type className="h-4 w-4" />} onMoveUp={moveUp} onMoveDown={moveDown} onRemove={removeBlock}>
      <Field label="First line">
        <Textarea
          className="min-h-0"
          value={block.firstTitle}
          onChange={handleTextArea((block, value) => {
            block.firstTitle = value;
          })}
        />
      </Field>
      <Field label="Second line">
        <Textarea
          className="min-h-0"
          value={block.secondTitle}
          onChange={handleTextArea((block, value) => {
            block.secondTitle = value;
          })}
        />
      </Field>
      <Field label="Description">
        <Textarea
          className="min-h-0"
          value={block.text}
          onChange={handleTextArea((block, value) => {
            block.text = value;
          })}
        />
      </Field>
      <Field label="Image">
        <ImageField
          value={block.imageUrl}
          onChange={(url) =>
            updateBlock((block) => {
              block.imageUrl = url;
            })
          }
        />
      </Field>

      <Field label="Phone">
        <Input
          value={block.phone}
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
