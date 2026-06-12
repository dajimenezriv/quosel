import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { FooterBlock, WebsiteData } from '@quosel/templates';
import { PanelBottom } from 'lucide-react';
import { useBlockHandlers } from './use-block-handlers';
import { Field, Section, Subgroup } from './utils';

interface Props {
  data: WebsiteData;
  block: FooterBlock;
  index: number;
}

export function FooterLayout({ data, block, index }: Props) {
  const { handleInput, handleTextArea, removeBlock, moveUp, moveDown } = useBlockHandlers<FooterBlock>(data, index);

  return (
    <Section title="Footer" icon={<PanelBottom className="h-4 w-4" />} onMoveUp={moveUp} onMoveDown={moveDown} onRemove={removeBlock}>
      <Field label="Description">
        <Textarea
          className="min-h-0"
          value={block.description}
          onChange={handleTextArea((block, value) => {
            block.description = value;
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

      {block.links.map((link, linkIndex) => (
        <Subgroup key={linkIndex} title={`Link ${linkIndex + 1}`}>
          <Field label="Label">
            <Input
              value={link.label}
              onChange={handleInput((block, value) => {
                block.links[linkIndex].label = value;
              })}
            />
          </Field>
          <Field label="URL">
            <Input
              value={link.url}
              onChange={handleInput((block, value) => {
                block.links[linkIndex].url = value;
              })}
            />
          </Field>
        </Subgroup>
      ))}

      {block.legalLinks.map((link, linkIndex) => (
        <Subgroup key={linkIndex} title={`Legal Link ${linkIndex + 1}`}>
          <Field label="Label">
            <Input
              value={link.label}
              onChange={handleInput((block, value) => {
                block.legalLinks[linkIndex].label = value;
              })}
            />
          </Field>
          <Field label="URL">
            <Input
              value={link.url}
              onChange={handleInput((block, value) => {
                block.legalLinks[linkIndex].url = value;
              })}
            />
          </Field>
        </Subgroup>
      ))}
    </Section>
  );
}
