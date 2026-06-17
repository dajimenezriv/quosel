import type { WebsiteData } from '@/api/websites/use-update-website';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useEditorStore } from '@/core/editor/use-editor-store';
import { produce } from 'immer';
import { Navigation, Plus } from 'lucide-react';
import { Fragment } from 'react';
import { addableBlockTypes, createBlock, type AddableBlockType } from './block-defaults';
import { CtaLayout } from './cta-layout';
import { FooterLayout } from './footer-layout';
import { GalleryLayout } from './gallery-layout';
import { HeroLayout } from './hero-layout';
import { InfoLayout } from './info-layout';
import { LocationLayout } from './location-layout';
import { ReviewsLayout } from './reviews-layout';
import { RichTextHint } from './rich-text-hint';
import { SectionControlsProvider } from './section-controls-context';
import { ServicesLayout } from './services-layout';
import { StatsLayout } from './stats-layout';
import { Field, Section, Subgroup } from './utils';

const MAX_BLOCKS = 15;

interface Props {
  data: WebsiteData;
  isUserLogged: boolean;
}

export function LayoutTab({ data, isUserLogged }: Props) {
  const updateDraft = useEditorStore((s) => s.updateDraft);

  function handleInput(updater: (draft: WebsiteData, value: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      updateDraft(produce(data, (draft) => updater(draft, e.target.value)));
    };
  }

  function addBlock(type: AddableBlockType) {
    updateDraft(
      produce(data, (draft) => {
        draft.blocks.blocks.push(createBlock(type));
      }),
    );
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
      case 'footer':
        return <FooterLayout data={data} block={block} index={index} />;
    }
  }

  return (
    <SectionControlsProvider value={isUserLogged}>
      <div className="flex flex-col gap-4">
        <RichTextHint />

        <Section title="Navigation" icon={<Navigation className="h-4 w-4" />}>
          <Subgroup title="Call to Action">
            <div className="flex items-center gap-2">
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
            </div>
          </Subgroup>
        </Section>

        {data.blocks.blocks.map((block, index) => (
          <Fragment key={index}>
            <Separator />
            {renderBlock(block, index)}
          </Fragment>
        ))}

        {isUserLogged && (
          <>
            <Separator />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" disabled={data.blocks.blocks.length >= MAX_BLOCKS}>
                  <Plus className="h-4 w-4" />
                  Add Section
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {addableBlockTypes.map(({ type, label }) => (
                  <DropdownMenuItem key={type} onClick={() => addBlock(type)}>
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </SectionControlsProvider>
  );
}
