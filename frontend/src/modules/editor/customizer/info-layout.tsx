import type { WebsiteData } from '@/api/websites/use-update-website';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { InfoBlock } from '@quosel/templates';
import { Info } from 'lucide-react';
import { ImageField } from './image-field';
import { useBlockHandlers } from './use-block-handlers';
import { Field, Section } from './utils';

interface Props {
  data: WebsiteData;
  block: InfoBlock;
  index: number;
}

export function InfoLayout({ data, block, index }: Props) {
  const { updateBlock, handleInput, handleTextArea, removeBlock, moveUp, moveDown } = useBlockHandlers<InfoBlock>(data, index);

  return (
    <Section title="Info" icon={<Info className="h-4 w-4" />} onMoveUp={moveUp} onMoveDown={moveDown} onRemove={removeBlock}>
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
      <Field label="First paragraph">
        <Textarea
          className="min-h-0"
          value={block.text1}
          onChange={handleTextArea((block, value) => {
            block.text1 = value;
          })}
        />
      </Field>
      <Field label="Second paragraph">
        <Textarea
          className="min-h-0"
          value={block.text2}
          onChange={handleTextArea((block, value) => {
            block.text2 = value;
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
    </Section>
  );
}
