import type { Website } from '@/api/websites/use-get-website';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEditorStore } from '@/core/editor/use-editor-store';
import type { Me } from '@/old/auth';
import { circoloPopolareFooter, type FooterBlock } from '@quosel/core/templates';
import { produce } from 'immer';
import { PanelBottom, Plus, Trash2 } from 'lucide-react';
import { GenerateTextField } from './generate-text-field';
import { Field, Section, Subgroup } from './utils';

interface Props {
  user: Me | null;
  data: Website;
}

export function FooterLayout({ user, data }: Props) {
  const updateDraft = useEditorStore((s) => s.updateDraft);
  const block = data.blocks.footer;

  function updateBlock(updater: (block: FooterBlock) => void) {
    updateDraft(produce(data, (draft) => updater(draft.blocks.footer)));
  }

  function handleInput(updater: (block: FooterBlock, value: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      updateBlock((block) => updater(block, e.target.value));
    };
  }

  return (
    <Section title="Footer" icon={<PanelBottom className="h-4 w-4" />}>
      <GenerateTextField
        user={user}
        label="Description"
        generateLabel="Footer description"
        value={block.description}
        example={circoloPopolareFooter.description}
        updateBlock={updateBlock}
        set={(block, value) => {
          block.description = value;
        }}
      />

      <Field label="Navigate title">
        <Input
          value={block.navigateTitle}
          onChange={handleInput((block, value) => {
            block.navigateTitle = value;
          })}
        />
      </Field>

      <Field label="Contact title">
        <Input
          value={block.contactTitle}
          onChange={handleInput((block, value) => {
            block.contactTitle = value;
          })}
        />
      </Field>

      <Subgroup title="Links">
        <Field label="Title">
          <Input
            value={block.linksTitle}
            onChange={handleInput((block, value) => {
              block.linksTitle = value;
            })}
          />
        </Field>
        {block.links.map((link, linkIndex) => (
          <div key={linkIndex} className="flex items-center gap-2">
            <Input
              placeholder="Label"
              value={link.label}
              onChange={handleInput((block, value) => {
                block.links[linkIndex]!.label = value;
              })}
            />
            <Input
              placeholder="URL"
              value={link.url}
              onChange={handleInput((block, value) => {
                block.links[linkIndex]!.url = value;
              })}
            />
            <button
              onClick={() =>
                updateBlock((block) => {
                  block.links.splice(linkIndex, 1);
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
              block.links.push({ label: '', url: '' });
            })
          }>
          <Plus className="h-4 w-4" />
          Add link
        </Button>
      </Subgroup>

      <Subgroup title="Legal Links">
        {block.legalLinks.map((link, linkIndex) => (
          <div key={linkIndex} className="flex items-center gap-2">
            <Input
              placeholder="Label"
              value={link.label}
              onChange={handleInput((block, value) => {
                block.legalLinks[linkIndex]!.label = value;
              })}
            />
            <Input
              placeholder="URL"
              value={link.url}
              onChange={handleInput((block, value) => {
                block.legalLinks[linkIndex]!.url = value;
              })}
            />
            <button
              onClick={() =>
                updateBlock((block) => {
                  block.legalLinks.splice(linkIndex, 1);
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
              block.legalLinks.push({ label: '', url: '' });
            })
          }>
          <Plus className="h-4 w-4" />
          Add legal link
        </Button>
      </Subgroup>
    </Section>
  );
}
