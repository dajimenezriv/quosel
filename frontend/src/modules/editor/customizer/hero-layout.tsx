import type { Website } from '@/api/websites/use-get-website';
import { Input } from '@/components/ui/input';
import type { Me } from '@/old/auth';
import { circoloPopolareHero, type HeroBlock } from '@quosel/core/templates';
import { Type } from 'lucide-react';
import { GenerateTextField } from './generate-text-field';
import { ImageField } from './image-field';
import { useBlockHandlers } from './use-block-handlers';
import { Field, Section, Subgroup } from './utils';

interface Props {
  user: Me | null;
  data: Website;
  block: HeroBlock;
  index: number;
}

export function HeroLayout({ user, data, block, index }: Props) {
  const { updateBlock, handleInput, removeBlock, moveUp, moveDown } = useBlockHandlers<HeroBlock>(data, index);

  return (
    <Section title="Hero" icon={<Type className="h-4 w-4" />} onMoveUp={moveUp} onMoveDown={moveDown} onRemove={removeBlock}>
      <GenerateTextField
        user={user}
        label="Title"
        generateLabel="Hero title"
        value={block.title}
        example={circoloPopolareHero.title}
        updateBlock={updateBlock}
        set={(block, value) => {
          block.title = value;
        }}
      />
      <GenerateTextField
        user={user}
        label="Description"
        generateLabel="Hero description"
        value={block.text}
        example={circoloPopolareHero.text}
        updateBlock={updateBlock}
        set={(block, value) => {
          block.text = value;
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

      <Field label="Phone">
        <Input
          value={block.phone}
          onChange={handleInput((block, value) => {
            block.phone = value;
          })}
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
