import type { WebsiteData } from '@/api/websites/use-update-website';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { CtaBlock } from '@quosel/templates';
import { MousePointerClick } from 'lucide-react';
import { ImageField } from './image-field';
import { useBlockHandlers } from './use-block-handlers';
import { Field, Section, Subgroup } from './utils';

interface Props {
  data: WebsiteData;
  block: CtaBlock;
  index: number;
}

export function CtaLayout({ data, block, index }: Props) {
  const { updateBlock, handleInput, handleTextArea, removeBlock, moveUp, moveDown } = useBlockHandlers<CtaBlock>(data, index);

  return (
    <Section
      title="Call to Action"
      icon={<MousePointerClick className="h-4 w-4" />}
      onMoveUp={moveUp}
      onMoveDown={moveDown}
      onRemove={removeBlock}>
      <Field label="Title">
        <Textarea
          className="min-h-0"
          value={block.title}
          onChange={handleTextArea((block, value) => {
            block.title = value;
          })}
        />
      </Field>
      <Field label="Text">
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
