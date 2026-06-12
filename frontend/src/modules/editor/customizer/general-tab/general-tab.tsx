import { Input } from '@/components/ui/input';
import { useEditorStore } from '@/core/editor/use-editor-store';
import type { WebsiteData } from '@quosel/templates';
import { produce } from 'immer';
import { Field } from '../utils';

interface Props {
  data: WebsiteData;
}

export function GeneralTab({ data }: Props) {
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
    </div>
  );
}
