import type { Website } from '@/api/websites/use-get-website';
import { Input } from '@/components/ui/input';
import { circoloPopolareCta, type CtaBlock } from '@quosel/core/templates';
import { MousePointerClick } from 'lucide-react';
import { GenerateTextField } from './generate-text-field';
import { ImageField } from './image-field';
import { useBlockHandlers } from './use-block-handlers';
import { Field, Section, Subgroup } from './utils';

interface Props {
  data: Website;
  block: CtaBlock;
  index: number;
}

export function CtaLayout({ data, block, index }: Props) {
  const { updateBlock, handleInput, removeBlock, moveUp, moveDown } = useBlockHandlers<CtaBlock>(data, index);

  return (
    <Section
      title="Call to Action"
      icon={<MousePointerClick className="h-4 w-4" />}
      onMoveUp={moveUp}
      onMoveDown={moveDown}
      onRemove={removeBlock}>
      <GenerateTextField
        label="Title"
        generateLabel="Cta title"
        value={block.title}
        example={circoloPopolareCta.title}
        updateBlock={updateBlock}
        set={(block, value) => {
          block.title = value;
        }}
      />
      <GenerateTextField
        label="Text"
        generateLabel="Cta text"
        value={block.text}
        example={circoloPopolareCta.text}
        updateBlock={updateBlock}
        set={(block, value) => {
          block.text = value;
        }}
      />

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
