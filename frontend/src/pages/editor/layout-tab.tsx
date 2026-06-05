import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEditorStore } from '@/core/editor/use-editor-store';
import type { WebsiteData } from '@quosel/templates';
import { produce } from 'immer';

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
    <>
      <div className="border-border rounded-md border p-4">
        <div className="space-y-2">
          <div className="text-center text-xs font-semibold">Navigation</div>
          <Input
            value={data.blocks.nav.logo}
            onChange={handleInput((draft, value) => {
              draft.blocks.nav.logo = value;
            })}
          />
          {data.blocks.nav.links.map((link, idx) => (
            <Input
              key={link.label}
              value={link.label}
              onChange={handleInput((draft, value) => {
                draft.blocks.nav.links[idx].label = value;
              })}
            />
          ))}
          <Input
            value={data.blocks.nav.ctaText}
            onChange={handleInput((draft, value) => {
              draft.blocks.nav.ctaText = value;
            })}
          />
          <Input
            value={data.blocks.nav.ctaLink}
            onChange={handleInput((draft, value) => {
              draft.blocks.nav.ctaLink = value;
            })}
          />
        </div>
      </div>

      <div className="border-border hover:border-border/60 relative cursor-pointer rounded-md border p-4 transition-colors">
        <div className="space-y-2">
          <div className="text-center text-xs font-semibold">Hero</div>
          <Textarea
            value={data.blocks.hero.firstTitle}
            onChange={handleTextArea((draft, value) => {
              draft.blocks.hero.firstTitle = value;
            })}
          />
          <Textarea
            value={data.blocks.hero.secondTitle}
            onChange={handleTextArea((draft, value) => {
              draft.blocks.hero.secondTitle = value;
            })}
          />
          <Textarea
            value={data.blocks.hero.text}
            onChange={handleTextArea((draft, value) => {
              draft.blocks.hero.text = value;
            })}
          />
          <Input
            value={data.blocks.hero.ctaText}
            onChange={handleInput((draft, value) => {
              draft.blocks.hero.ctaText = value;
            })}
          />
          <Input
            value={data.blocks.hero.ctaLink}
            onChange={handleInput((draft, value) => {
              draft.blocks.hero.ctaLink = value;
            })}
          />
          <Input
            value={data.blocks.hero.phone}
            onChange={handleInput((draft, value) => {
              draft.blocks.hero.phone = value;
            })}
          />
        </div>
      </div>

      <div className="border-border hover:border-border/60 relative cursor-pointer rounded-md border p-4 transition-colors">
        <div className="space-y-2">
          <div className="text-center text-xs font-semibold">Hero</div>
          <Textarea
            value={data.blocks.hero.firstTitle}
            onChange={handleTextArea((draft, value) => {
              draft.blocks.hero.firstTitle = value;
            })}
          />
          <Textarea
            value={data.blocks.hero.secondTitle}
            onChange={handleTextArea((draft, value) => {
              draft.blocks.hero.secondTitle = value;
            })}
          />
          <Textarea
            value={data.blocks.hero.text}
            onChange={handleTextArea((draft, value) => {
              draft.blocks.hero.text = value;
            })}
          />
          <Input
            value={data.blocks.hero.ctaText}
            onChange={handleInput((draft, value) => {
              draft.blocks.hero.ctaText = value;
            })}
          />
          <Input
            value={data.blocks.hero.ctaLink}
            onChange={handleInput((draft, value) => {
              draft.blocks.hero.ctaLink = value;
            })}
          />
          <Input
            value={data.blocks.hero.phone}
            onChange={handleInput((draft, value) => {
              draft.blocks.hero.phone = value;
            })}
          />
        </div>
      </div>
    </>
  );
}
