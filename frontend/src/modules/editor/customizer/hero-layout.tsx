import type { Website } from '@/api/websites/use-get-website';
import { Input } from '@/components/ui/input';
import { useEditorStore } from '@/core/editor/use-editor-store';
import type { Me } from '@/old/auth';
import { circoloPopolareHero, type HeroBlock } from '@quosel/core/templates';
import { produce } from 'immer';
import { Type } from 'lucide-react';
import { GenerateTextField } from './generate-text-field';
import { ImageWithAltField } from './image-with-alt-field';
import { Field, Section, Subgroup } from './utils';

interface Props {
  user: Me | null;
  data: Website;
}

export function HeroLayout({ user, data }: Props) {
  const updateDraft = useEditorStore((s) => s.updateDraft);
  const block = data.blocks.homepage.hero;

  function updateBlock(updater: (block: HeroBlock) => void) {
    updateDraft(produce(data, (draft) => updater(draft.blocks.homepage.hero)));
  }

  function handleInput(updater: (block: HeroBlock, value: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      updateBlock((block) => updater(block, e.target.value));
    };
  }

  return (
    <Section title="Hero" icon={<Type className="h-4 w-4" />}>
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
      <ImageWithAltField
        user={user}
        url={block.imageUrl}
        alt={block.imageAlt}
        onUrlChange={(url) =>
          updateBlock((block) => {
            block.imageUrl = url;
          })
        }
        onAltChange={(alt) =>
          updateBlock((block) => {
            block.imageAlt = alt;
          })
        }
      />

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
