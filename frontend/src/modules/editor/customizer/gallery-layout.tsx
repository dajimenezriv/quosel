import type { Website } from '@/api/websites/use-get-website';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Me } from '@/old/auth';
import { circoloPopolareGallery, type GalleryBlock } from '@quosel/core/templates';
import { Images, Plus, Trash2 } from 'lucide-react';
import { GenerateTextField } from './generate-text-field';
import { ImageField } from './image-field';
import { useBlockHandlers } from './use-block-handlers';
import { Field, Section, Subgroup } from './utils';

interface Props {
  user: Me | null;
  data: Website;
  block: GalleryBlock;
  index: number;
}

export function GalleryLayout({ user, data, block, index }: Props) {
  const { updateBlock, handleInput, removeBlock, moveUp, moveDown } = useBlockHandlers<GalleryBlock>(data, index);

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

      <GenerateTextField
        user={user}
        label="Title"
        generateLabel="Gallery title"
        value={block.title}
        example={circoloPopolareGallery.title}
        updateBlock={updateBlock}
        set={(block, value) => {
          block.title = value;
        }}
      />
      <GenerateTextField
        user={user}
        label="Text"
        generateLabel="Gallery text"
        value={block.text}
        example={circoloPopolareGallery.text}
        updateBlock={updateBlock}
        set={(block, value) => {
          block.text = value;
        }}
      />

      <Subgroup title="Images">
        {block.images.map((image, imageIndex) => (
          <div key={imageIndex} className="flex flex-col gap-2">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Field label="Image">
                  <ImageField
                    user={user}
                    value={image.url}
                    onChange={(url) =>
                      updateBlock((block) => {
                        block.images[imageIndex]!.url = url;
                      })
                    }
                  />
                </Field>
              </div>

              <button
                onClick={() =>
                  updateBlock((block) => {
                    block.images.splice(imageIndex, 1);
                  })
                }
                className="text-muted-foreground hover:text-destructive mb-2 cursor-pointer">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <Field label="Image description (alt)">
              <Input
                value={image.alt}
                placeholder="Describe the image for SEO"
                onChange={(e) =>
                  updateBlock((block) => {
                    block.images[imageIndex]!.alt = e.target.value;
                  })
                }
              />
            </Field>
          </div>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            updateBlock((block) => {
              block.images.push({ url: '', alt: '' });
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
