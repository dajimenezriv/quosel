import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { GalleryBlock, WebsiteData } from '@quosel/templates';
import { Images } from 'lucide-react';
import { ImageField } from './image-field';
import { useBlockHandlers } from './use-block-handlers';
import { Field, Section, Subgroup } from './utils';

interface Props {
  data: WebsiteData;
  block: GalleryBlock;
  index: number;
}

export function GalleryLayout({ data, block, index }: Props) {
  const { updateBlock, handleInput, handleTextArea } = useBlockHandlers<GalleryBlock>(data, index);

  return (
    <Section title="Gallery" icon={<Images className="h-4 w-4" />}>
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

      {block.images.map((image, imageIndex) => (
        <Field key={imageIndex} label={`Image ${imageIndex + 1}`}>
          <ImageField
            value={image}
            onChange={(url) =>
              updateBlock((block) => {
                block.images[imageIndex] = url;
              })
            }
          />
        </Field>
      ))}

      <Subgroup title="Call to Action">
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
      </Subgroup>
    </Section>
  );
}
