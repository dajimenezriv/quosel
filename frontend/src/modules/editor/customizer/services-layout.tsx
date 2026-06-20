import type { Website } from '@/api/websites/use-get-website';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { circoloPopolareServices, type ServicesBlock } from '@quosel/core/templates';
import { Briefcase, Plus } from 'lucide-react';
import { GenerateTextField } from './generate-text-field';
import { useBlockHandlers } from './use-block-handlers';
import { Field, Section, Subgroup } from './utils';

interface Props {
  data: Website;
  block: ServicesBlock;
  index: number;
}

export function ServicesLayout({ data, block, index }: Props) {
  const { handleInput, handleTextArea, updateBlock, removeBlock, moveUp, moveDown } = useBlockHandlers<ServicesBlock>(data, index);

  return (
    <Section title="Services" icon={<Briefcase className="h-4 w-4" />} onMoveUp={moveUp} onMoveDown={moveDown} onRemove={removeBlock}>
      <Field label="Navigation Label">
        <Input
          value={block.nav}
          onChange={handleInput((block, value) => {
            block.nav = value;
          })}
        />
      </Field>

      <GenerateTextField
        label="Title"
        generateLabel="Services title"
        value={block.title}
        example={circoloPopolareServices.title}
        updateBlock={updateBlock}
        set={(block, value) => {
          block.title = value;
        }}
      />
      <GenerateTextField
        label="Text"
        generateLabel="Services text"
        value={block.text}
        example={circoloPopolareServices.text}
        updateBlock={updateBlock}
        set={(block, value) => {
          block.text = value;
        }}
      />

      {block.serviceGroups.map((group, groupIndex) => (
        <Subgroup
          key={groupIndex}
          title={group.title || `Group ${groupIndex + 1}`}
          onRemove={() =>
            updateBlock((block) => {
              block.serviceGroups.splice(groupIndex, 1);
            })
          }>
          <Field label="Group Title">
            <Input
              value={group.title}
              onChange={handleInput((block, value) => {
                block.serviceGroups[groupIndex]!.title = value;
              })}
            />
          </Field>
          {group.services.map((service, serviceIndex) => (
            <Subgroup
              key={serviceIndex}
              title={`Service ${serviceIndex + 1}`}
              onRemove={() =>
                updateBlock((block) => {
                  block.serviceGroups[groupIndex]!.services.splice(serviceIndex, 1);
                })
              }>
              <div className="flex items-center gap-2">
                <Field label="Title">
                  <Input
                    value={service.title}
                    onChange={handleInput((block, value) => {
                      block.serviceGroups[groupIndex]!.services[serviceIndex]!.title = value;
                    })}
                  />
                </Field>
                <Field label="Price">
                  <Input
                    value={service.price}
                    onChange={handleInput((block, value) => {
                      block.serviceGroups[groupIndex]!.services[serviceIndex]!.price = value;
                    })}
                  />
                </Field>
              </div>
              <Field label="Text">
                <Textarea
                  className="min-h-0"
                  value={service.text}
                  onChange={handleTextArea((block, value) => {
                    block.serviceGroups[groupIndex]!.services[serviceIndex]!.text = value;
                  })}
                />
              </Field>
            </Subgroup>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              updateBlock((block) => {
                block.serviceGroups[groupIndex]!.services.push({ title: '', text: '', price: '' });
              })
            }>
            <Plus className="h-4 w-4" />
            Add service
          </Button>
        </Subgroup>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          updateBlock((block) => {
            block.serviceGroups.push({ title: '', services: [] });
          })
        }>
        <Plus className="h-4 w-4" />
        Add service group
      </Button>

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
