import type { Website } from '@/api/websites/use-get-website';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { useEditorStore } from '@/core/editor/use-editor-store';
import type { Me } from '@/old/auth';
import { produce } from 'immer';
import { Plus } from 'lucide-react';
import { Fragment } from 'react';
import { addableBlockTypes, createBlock, type AddableBlockType } from './block-defaults';
import { CtaLayout } from './cta-layout';
import { FooterLayout } from './footer-layout';
import { GalleryLayout } from './gallery-layout';
import { HeroLayout } from './hero-layout';
import { InfoLayout } from './info-layout';
import { LocationLayout } from './location-layout';
import { NavLayout } from './nav-layout';
import { ReviewsLayout } from './reviews-layout';
import { RichTextHint } from './rich-text-hint';
import { SectionControlsProvider } from './section-controls-context';
import { ServicesLayout } from './services-layout';
import { StatsLayout } from './stats-layout';

const MAX_BLOCKS = 20;

interface Props {
  data: Website;
  user: Me | null;
}

export function LayoutTab({ user, data }: Props) {
  const updateDraft = useEditorStore((s) => s.updateDraft);

  function addBlock(type: AddableBlockType) {
    updateDraft(
      produce(data, (draft) => {
        draft.blocks.homepage.blocks.push(createBlock(type));
      }),
    );
  }

  function renderBlock(block: Website['blocks']['homepage']['blocks'][number], index: number) {
    switch (block.type) {
      case 'stats':
        return <StatsLayout data={data} block={block} index={index} />;
      case 'info':
        return <InfoLayout user={user} data={data} block={block} index={index} />;
      case 'cta':
        return <CtaLayout user={user} data={data} block={block} index={index} />;
      case 'gallery':
        return <GalleryLayout user={user} data={data} block={block} index={index} />;
      case 'reviews':
        return <ReviewsLayout user={user} data={data} block={block} index={index} />;
      case 'services':
        return <ServicesLayout user={user} data={data} block={block} index={index} />;
      case 'location':
        return <LocationLayout user={user} data={data} block={block} index={index} />;
    }
  }

  return (
    <SectionControlsProvider value={user}>
      <div className="flex flex-col gap-4">
        <RichTextHint />

        <NavLayout user={user} data={data} />

        <Separator />
        <HeroLayout user={user} data={data} />

        {data.blocks.homepage.blocks.map((block, index) => (
          <Fragment key={index}>
            <Separator />
            {renderBlock(block, index)}
          </Fragment>
        ))}

        {user && (
          <>
            <Separator />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" disabled={data.blocks.homepage.blocks.length >= MAX_BLOCKS}>
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

        <Separator />
        <FooterLayout user={user} data={data} />
      </div>
    </SectionControlsProvider>
  );
}
