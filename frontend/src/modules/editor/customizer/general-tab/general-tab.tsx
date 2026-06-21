import type { Website } from '@/api/websites/use-get-website';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEditorStore } from '@/core/editor/use-editor-store';
import type { Me } from '@/old/auth';
import { slugifyInput } from '@quosel/core/templates';
import { produce } from 'immer';
import { ImageField } from '../image-field';
import { Field } from '../utils';

interface Props {
  user: Me | null;
  data: Website;
}

export function GeneralTab({ user, data }: Props) {
  const updateDraft = useEditorStore((s) => s.updateDraft);

  return (
    <div className="flex flex-col gap-4">
      <Field label="Website Name">
        <Input
          value={data.blocks.name}
          onChange={(e) => {
            updateDraft(
              produce(data, (draft) => {
                draft.blocks.name = e.target.value;
              }),
            );
          }}
        />
      </Field>
      <Field label="Logo">
        <ImageField
          user={user}
          value={data.blocks.logoUrl}
          onChange={(url) => {
            updateDraft(
              produce(data, (draft) => {
                draft.blocks.logoUrl = url;
              }),
            );
          }}
        />
      </Field>
      <Field label="Slug">
        <Input
          value={data.slug}
          onChange={(e) => {
            updateDraft(
              produce(data, (draft) => {
                draft.slug = slugifyInput(e.target.value);
              }),
            );
          }}
        />
      </Field>
      <Field label="AI Context">
        <Textarea
          value={data.context}
          placeholder="Describe the business (what it offers, tone, audience). Used when generating field text."
          rows={4}
          onChange={(e) => {
            updateDraft(
              produce(data, (draft) => {
                draft.context = e.target.value;
              }),
            );
          }}
        />
      </Field>
    </div>
  );
}
