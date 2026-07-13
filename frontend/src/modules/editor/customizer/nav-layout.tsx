import type { Website } from '@/api/websites/use-get-website';
import { Input } from '@/components/ui/input';
import { useEditorStore } from '@/core/editor/use-editor-store';
import type { Me } from '@/old/auth';
import { produce } from 'immer';
import { Navigation } from 'lucide-react';
import { ImageField } from './image-field';
import { Field, Section, Subgroup } from './utils';

type NavBlock = Website['blocks']['nav'];

interface Props {
  user: Me | null;
  data: Website;
}

export function NavLayout({ user, data }: Props) {
  const updateDraft = useEditorStore((s) => s.updateDraft);
  const block = data.blocks.nav;

  function updateBlock(updater: (block: NavBlock) => void) {
    updateDraft(produce(data, (draft) => updater(draft.blocks.nav)));
  }

  function handleInput(updater: (block: NavBlock, value: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      updateBlock((block) => updater(block, e.target.value));
    };
  }

  return (
    <Section title="Navigation" icon={<Navigation className="h-4 w-4" />}>
      <Field label="Logo">
        <ImageField
          user={user}
          value={block.logoUrl}
          onChange={(url) =>
            updateBlock((block) => {
              block.logoUrl = url;
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
