import type { WebsiteData } from '@/api/websites/use-update-website';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Layout, Palette, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { GeneralTab } from './general-tab/general-tab';
import { LayoutTab } from './layout-tab';
import { ThemeTab } from './theme-tab';

interface Props {
  data: WebsiteData;
  open: boolean;
}

export function Customizer({ data, open }: Props) {
  const [activeTab, setActiveTab] = useState('layout');

  return (
    <div className={cn('shrink-0 overflow-hidden', open ? 'w-120' : 'w-0')}>
      <div className="flex h-full w-120 flex-col border-l">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex min-h-0 flex-1 flex-col">
          <TabsList className="flex h-12 rounded-none p-1.5">
            <TabsTrigger value="general" className="data-[state=active]:bg-background cursor-pointer">
              <SlidersHorizontal className="mr-1 h-4 w-4" /> General
            </TabsTrigger>
            <TabsTrigger value="layout" className="data-[state=active]:bg-background cursor-pointer">
              <Layout className="mr-1 h-4 w-4" /> Layout
            </TabsTrigger>
            <TabsTrigger value="theme" className="data-[state=active]:bg-background cursor-pointer">
              <Palette className="mr-1 h-4 w-4" /> Theme
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="flex min-h-0 flex-1 flex-col overflow-auto p-4">
            <GeneralTab data={data} />
          </TabsContent>

          <TabsContent value="layout" className="flex min-h-0 flex-1 flex-col overflow-auto p-4">
            <LayoutTab data={data} />
          </TabsContent>

          <TabsContent value="theme" className="flex min-h-0 flex-1 flex-col overflow-auto p-4">
            <ThemeTab data={data} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
