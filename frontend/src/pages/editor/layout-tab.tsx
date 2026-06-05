import { Input } from '@/components/ui/input';
import { useEditorStore } from '@/core/editor/use-editor-store';
import type { WebsiteData } from '@quosel/templates';
import { produce } from 'immer';
import { sidebarCollapsibleOptions } from './theme-customizer-constants';

interface Props {
  data: WebsiteData;
}

export function LayoutTab({ data }: Props) {
  const updateDraft = useEditorStore((s) => s.updateDraft);

  function handleChange(updater: (draft: WebsiteData, value: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      updateDraft(produce(data, (draft) => updater(draft, e.target.value)));
    };
  }

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="border-border hover:border-border/60 relative cursor-pointer rounded-md border p-4 transition-colors">
        <div className="space-y-2">
          <div className="text-center text-xs font-semibold">Navigation</div>
          <Input
            value={data.blocks.nav.logo}
            onChange={handleChange((draft, value) => {
              draft.blocks.nav.logo = value;
            })}
          />
          {data.blocks.nav.links.map((link, idx) => (
            <Input
              key={link.label}
              value={link.label}
              onChange={handleChange((draft, value) => {
                draft.blocks.nav.links[idx].label = value;
              })}
            />
          ))}
          <Input
            value={data.blocks.nav.ctaText}
            onChange={handleChange((draft, value) => {
              draft.blocks.nav.ctaText = value;
            })}
          />
          <Input
            value={data.blocks.nav.ctaLink}
            onChange={handleChange((draft, value) => {
              draft.blocks.nav.ctaLink = value;
            })}
          />
        </div>
      </div>

      <div className="border-border hover:border-border/60 relative cursor-pointer rounded-md border p-4 transition-colors">
        <div className="space-y-2">
          <div className="text-center text-xs font-semibold">Hero</div>
          <Input
            value={data.blocks.hero.firstTitle}
            onChange={handleChange((draft, value) => {
              draft.blocks.hero.firstTitle = value;
            })}
          />
          <Input
            value={data.blocks.hero.secondTitle}
            onChange={handleChange((draft, value) => {
              draft.blocks.hero.secondTitle = value;
            })}
          />
          <Input
            value={data.blocks.hero.text}
            onChange={handleChange((draft, value) => {
              draft.blocks.hero.text = value;
            })}
          />
          <Input
            value={data.blocks.hero.ctaText}
            onChange={handleChange((draft, value) => {
              draft.blocks.hero.ctaText = value;
            })}
          />
          <Input
            value={data.blocks.hero.ctaLink}
            onChange={handleChange((draft, value) => {
              draft.blocks.hero.ctaLink = value;
            })}
          />
          <Input
            value={data.blocks.hero.phone}
            onChange={handleChange((draft, value) => {
              draft.blocks.hero.phone = value;
            })}
          />
        </div>
      </div>
      {sidebarCollapsibleOptions.map((option) => (
        <div
          key={option.value}
          className={`relative cursor-pointer rounded-md border p-4 transition-colors ${'border-border hover:border-border/60'}`}>
          <div className="space-y-2">
            <div className="text-center text-xs font-semibold">{option.name}</div>
            <div className="bg-background flex h-12 rounded border"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
