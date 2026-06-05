import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useEditorStore } from '@/core/editor/use-editor-store';
import { cn } from '@/lib/utils';
import type { WebsiteData } from '@quosel/templates';
import { produce } from 'immer';
import { ChevronRight, Navigation, Type } from 'lucide-react';
import { useState, type ReactNode } from 'react';

interface Props {
  data: WebsiteData;
}

export function LayoutTab({ data }: Props) {
  const updateDraft = useEditorStore((s) => s.updateDraft);

  function handleTextArea(updater: (draft: WebsiteData, value: string) => void) {
    return (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateDraft(produce(data, (draft) => updater(draft, e.target.value)));
    };
  }

  function handleInput(updater: (draft: WebsiteData, value: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      updateDraft(produce(data, (draft) => updater(draft, e.target.value)));
    };
  }

  return (
    <div className="flex flex-col gap-4">
      <Section title="Navigation" icon={<Navigation className="h-4 w-4" />}>
        <Field label="Logo">
          <Input
            value={data.blocks.nav.logo}
            onChange={handleInput((draft, value) => {
              draft.blocks.nav.logo = value;
            })}
          />
        </Field>

        <Field label="Links">
          <div className="flex flex-col gap-2">
            {data.blocks.nav.links.map((link, idx) => (
              <Input
                key={idx}
                value={link.label}
                onChange={handleInput((draft, value) => {
                  draft.blocks.nav.links[idx].label = value;
                })}
              />
            ))}
          </div>
        </Field>

        <Subgroup title="Call to Action">
          <Field label="Button Text">
            <Input
              value={data.blocks.nav.ctaText}
              onChange={handleInput((draft, value) => {
                draft.blocks.nav.ctaText = value;
              })}
            />
          </Field>
          <Field label="Button Link">
            <Input
              value={data.blocks.nav.ctaLink}
              onChange={handleInput((draft, value) => {
                draft.blocks.nav.ctaLink = value;
              })}
            />
          </Field>
        </Subgroup>
      </Section>

      <Separator />

      <Section title="Hero" icon={<Type className="h-4 w-4" />}>
        <Field label="First line">
          <Textarea
            className="min-h-0"
            value={data.blocks.hero.firstTitle}
            onChange={handleTextArea((draft, value) => {
              draft.blocks.hero.firstTitle = value;
            })}
          />
        </Field>
        <Field label="Second line">
          <Textarea
            className="min-h-0"
            value={data.blocks.hero.secondTitle}
            onChange={handleTextArea((draft, value) => {
              draft.blocks.hero.secondTitle = value;
            })}
          />
        </Field>
        <Field label="Description">
          <Textarea
            className="min-h-0"
            value={data.blocks.hero.text}
            onChange={handleTextArea((draft, value) => {
              draft.blocks.hero.text = value;
            })}
          />
        </Field>
        <Field label="Phone">
          <Input
            value={data.blocks.hero.phone}
            onChange={handleInput((draft, value) => {
              draft.blocks.hero.phone = value;
            })}
          />
        </Field>

        <Subgroup title="Call to Action">
          <Field label="Button Text">
            <Input
              value={data.blocks.hero.ctaText}
              onChange={handleInput((draft, value) => {
                draft.blocks.hero.ctaText = value;
              })}
            />
          </Field>
          <Field label="Button Link">
            <Input
              value={data.blocks.hero.ctaLink}
              onChange={handleInput((draft, value) => {
                draft.blocks.hero.ctaLink = value;
              })}
            />
          </Field>
        </Subgroup>
      </Section>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <button onClick={() => setOpen((o) => !o)} className="flex cursor-pointer items-center gap-2 py-2">
        <span className="text-muted-foreground">{icon}</span>
        <span className="text-sm font-semibold">{title}</span>
        <ChevronRight className={cn('text-muted-foreground ml-auto h-4 w-4 transition-transform', open && 'rotate-90')} />
      </button>
      {open && children}
    </div>
  );
}

function Subgroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-muted/40 flex flex-col gap-3 rounded-md p-3">
      <span className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">{title}</span>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-muted-foreground text-xs">{label}</Label>
      {children}
    </div>
  );
}
