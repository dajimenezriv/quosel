import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useEditorStore } from '@/core/editor/use-editor-store';
import type { WebsiteData } from '@quosel/templates';
import { produce } from 'immer';
import { Navigation } from 'lucide-react';
import { Fragment } from 'react';
import { CtaLayout } from './cta-layout';
import { GalleryLayout } from './gallery-layout';
import { HeroLayout } from './hero-layout';
import { InfoLayout } from './info-layout';
import { LocationLayout } from './location-layout';
import { ReviewsLayout } from './reviews-layout';
import { ServicesLayout } from './services-layout';
import { StatsLayout } from './stats-layout';
import { Field, Section, Subgroup } from './utils';

interface Props {
  data: WebsiteData;
}

export function LayoutTab({ data }: Props) {
  const updateDraft = useEditorStore((s) => s.updateDraft);

  function handleInput(updater: (draft: WebsiteData, value: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      updateDraft(produce(data, (draft) => updater(draft, e.target.value)));
    };
  }

  function renderBlock(block: WebsiteData['blocks']['blocks'][number], index: number) {
    switch (block.type) {
      case 'hero':
        return <HeroLayout data={data} block={block} index={index} />;
      case 'stats':
        return <StatsLayout data={data} block={block} index={index} />;
      case 'info':
        return <InfoLayout data={data} block={block} index={index} />;
      case 'cta':
        return <CtaLayout data={data} block={block} index={index} />;
      case 'gallery':
        return <GalleryLayout data={data} block={block} index={index} />;
      case 'reviews':
        return <ReviewsLayout data={data} block={block} index={index} />;
      case 'services':
        return <ServicesLayout data={data} block={block} index={index} />;
      case 'location':
        return <LocationLayout data={data} block={block} index={index} />;
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Section title="Navigation" icon={<Navigation className="h-4 w-4" />}>
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

      {data.blocks.blocks.map((block, index) => (
        <Fragment key={index}>
          <Separator />
          {renderBlock(block, index)}
        </Fragment>
      ))}
    </div>
  );
}
