import type { Website } from '@/api/websites/use-get-website';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Me } from '@/old/auth';
import { circoloPopolareFooter, type FooterBlock } from '@quosel/core/templates';
import { PanelBottom, Plus, Trash2 } from 'lucide-react';
import { GenerateTextField } from './generate-text-field';
import { useBlockHandlers } from './use-block-handlers';
import { Field, Section, Subgroup } from './utils';

interface Props {
  user: Me | null;
  data: Website;
  block: FooterBlock;
  index: number;
}

export function FooterLayout({ user, data, block, index }: Props) {
  const { handleInput, updateBlock, removeBlock, moveUp, moveDown } = useBlockHandlers<FooterBlock>(data, index);

  return (
    <Section title="Footer" icon={<PanelBottom className="h-4 w-4" />} onMoveUp={moveUp} onMoveDown={moveDown} onRemove={removeBlock}>
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

      <Subgroup title="Contact">
        <Field label="Title">
          <Input
            value={block.contactTitle}
            onChange={handleInput((block, value) => {
              block.contactTitle = value;
            })}
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
        <Field label="Address">
          <Input
            value={block.address}
            onChange={handleInput((block, value) => {
              block.address = value;
            })}
          />
        </Field>
      </Subgroup>

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
