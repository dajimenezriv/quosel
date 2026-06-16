import type { WebsiteData } from '@/api/websites/use-update-website';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { ReviewsBlock } from '@quosel/core/templates';
import { Plus, Star, Trash2 } from 'lucide-react';
import { useBlockHandlers } from './use-block-handlers';
import { Field, Section, Subgroup } from './utils';

interface Props {
  data: WebsiteData;
  block: ReviewsBlock;
  index: number;
}

export function ReviewsLayout({ data, block, index }: Props) {
  const { handleInput, handleTextArea, updateBlock, removeBlock, moveUp, moveDown } = useBlockHandlers<ReviewsBlock>(data, index);

  return (
    <Section title="Reviews" icon={<Star className="h-4 w-4" />} onMoveUp={moveUp} onMoveDown={moveDown} onRemove={removeBlock}>
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

      <Subgroup title="Stats">
        {block.stats.map((stat, statIndex) => (
          <div key={statIndex} className="flex items-center gap-2">
            <Input
              placeholder="Value"
              value={stat.value}
              onChange={handleInput((block, value) => {
                block.stats[statIndex].value = value;
              })}
            />
            <Input
              placeholder="Label"
              value={stat.label}
              onChange={handleInput((block, value) => {
                block.stats[statIndex].label = value;
              })}
            />
            <button
              onClick={() =>
                updateBlock((block) => {
                  block.stats.splice(statIndex, 1);
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
              block.stats.push({ value: '', label: '' });
            })
          }>
          <Plus className="h-4 w-4" />
          Add stat
        </Button>
      </Subgroup>

      {block.reviews.map((review, reviewIndex) => (
        <Subgroup
          key={reviewIndex}
          title={`Review ${reviewIndex + 1}`}
          onRemove={() =>
            updateBlock((block) => {
              block.reviews.splice(reviewIndex, 1);
            })
          }>
          <Field label="Text">
            <Textarea
              className="min-h-0"
              value={review.text}
              onChange={handleTextArea((block, value) => {
                block.reviews[reviewIndex].text = value;
              })}
            />
          </Field>
          <Field label="Author">
            <Input
              value={review.author}
              onChange={handleInput((block, value) => {
                block.reviews[reviewIndex].author = value;
              })}
            />
          </Field>
          <Field label="Source">
            <Input
              value={review.source}
              onChange={handleInput((block, value) => {
                block.reviews[reviewIndex].source = value;
              })}
            />
          </Field>
          <Field label="URL">
            <Input
              value={review.url}
              onChange={handleInput((block, value) => {
                block.reviews[reviewIndex].url = value;
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
            block.reviews.push({ text: '', author: '', source: '', url: '' });
          })
        }>
        <Plus className="h-4 w-4" />
        Add review
      </Button>
    </Section>
  );
}
