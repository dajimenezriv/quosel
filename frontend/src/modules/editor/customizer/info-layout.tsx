import type { Website } from '@/api/websites/use-get-website';
import { Input } from '@/components/ui/input';
import type { Me } from '@/old/auth';
import { circoloPopolareInfo, type InfoBlock } from '@quosel/core/templates';
import { Info } from 'lucide-react';
import { GenerateTextField } from './generate-text-field';
import { ImageField } from './image-field';
import { useBlockHandlers } from './use-block-handlers';
import { Field, Section } from './utils';

interface Props {
  user: Me | null;
  data: Website;
  block: InfoBlock;
  index: number;
}

export function InfoLayout({ user, data, block, index }: Props) {
  const { updateBlock, handleInput, removeBlock, moveUp, moveDown } = useBlockHandlers<InfoBlock>(data, index);

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
      <GenerateTextField
        user={user}
        label="Title"
        generateLabel="Info title"
        value={block.title}
        example={circoloPopolareInfo.title}
        updateBlock={updateBlock}
        set={(block, value) => {
          block.title = value;
        }}
      />
      <GenerateTextField
        user={user}
        label="First paragraph"
        generateLabel="Info first paragraph"
        value={block.text1}
        example={circoloPopolareInfo.text1}
        updateBlock={updateBlock}
        set={(block, value) => {
          block.text1 = value;
        }}
      />
      <GenerateTextField
        user={user}
        label="Second paragraph"
        generateLabel="Info second paragraph"
        value={block.text2}
        example={circoloPopolareInfo.text2}
        updateBlock={updateBlock}
        set={(block, value) => {
          block.text2 = value;
        }}
      />
      <Field label="Image">
        <ImageField
          user={user}
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
