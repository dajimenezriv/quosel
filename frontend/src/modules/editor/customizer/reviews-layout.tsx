import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { ReviewsBlock, WebsiteData } from '@quosel/templates';
import { Star } from 'lucide-react';
import { useBlockHandlers } from './use-block-handlers';
import { Field, Section, Subgroup } from './utils';

interface Props {
  data: WebsiteData;
  block: ReviewsBlock;
  index: number;
}

export function ReviewsLayout({ data, block, index }: Props) {
  const { handleInput, handleTextArea, removeBlock, moveUp, moveDown } = useBlockHandlers<ReviewsBlock>(data, index);

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

      {block.stats.map((stat, statIndex) => (
        <Subgroup key={statIndex} title={`Stat ${statIndex + 1}`}>
          <Field label="Value">
            <Input
              value={stat.value}
              onChange={handleInput((block, value) => {
                block.stats[statIndex].value = value;
              })}
            />
          </Field>
          <Field label="Label">
            <Input
              value={stat.label}
              onChange={handleInput((block, value) => {
                block.stats[statIndex].label = value;
              })}
            />
          </Field>
        </Subgroup>
      ))}

      {block.reviews.map((review, reviewIndex) => (
        <Subgroup key={reviewIndex} title={`Review ${reviewIndex + 1}`}>
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
    </Section>
  );
}
