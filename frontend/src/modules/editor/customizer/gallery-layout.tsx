import type { WebsiteData } from '@/api/websites/use-update-website';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { GalleryBlock } from '@quosel/templates';
import { Images, Plus, Trash2 } from 'lucide-react';
import { ImageField } from './image-field';
import { useBlockHandlers } from './use-block-handlers';
import { Field, Section, Subgroup } from './utils';

interface Props {
  data: WebsiteData;
  block: GalleryBlock;
  index: number;
}

export function GalleryLayout({ data, block, index }: Props) {
  const { updateBlock, handleInput, handleTextArea, removeBlock, moveUp, moveDown } = useBlockHandlers<GalleryBlock>(data, index);

  return (
    <Section title="Gallery" icon={<Images className="h-4 w-4" />} onMoveUp={moveUp} onMoveDown={moveDown} onRemove={removeBlock}>
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
      <Field label="Text">
        <Textarea
          className="min-h-0"
          value={block.text}
          onChange={handleTextArea((block, value) => {
            block.text = value;
          })}
        />
      </Field>

      <Subgroup title="Images">
        {block.images.map((image, imageIndex) => (
          <div key={imageIndex} className="flex items-center gap-2">
            <div className="flex-1">
              <ImageField
                value={image}
                onChange={(url) =>
                  updateBlock((block) => {
                    block.images[imageIndex] = url;
                  })
                }
              />
            </div>
            <button
              onClick={() =>
                updateBlock((block) => {
                  block.images.splice(imageIndex, 1);
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
              block.images.push('');
            })
          }>
          <Plus className="h-4 w-4" />
          Add image
        </Button>
      </Subgroup>

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
