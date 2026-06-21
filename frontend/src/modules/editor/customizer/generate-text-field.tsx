import { Textarea } from '@/components/ui/textarea';
import type { Me } from '@/old/auth';
import { GenerateButton } from './generate-button';
import { Field } from './utils';

interface Props<T> {
  user: Me | null;
  label: string;
  generateLabel: string;
  value: string;
  example: string;
  updateBlock: (updater: (block: T) => void) => void;
  set: (block: T, value: string) => void;
}

export function GenerateTextField<T>({ user, label, generateLabel, value, example, updateBlock, set }: Props<T>) {
  return (
    <Field
      label={label}
      action={
        user && (
          <GenerateButton
            label={generateLabel}
            value={value}
            example={example}
            onGenerate={(text) => updateBlock((block) => set(block, text))}
          />
        )
      }>
      <Textarea className="min-h-0" value={value} onChange={(e) => updateBlock((block) => set(block, e.target.value))} />
    </Field>
  );
}
