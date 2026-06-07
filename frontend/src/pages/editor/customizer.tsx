import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEditorStore } from '@/core/editor/use-editor-store';
import { cn } from '@/lib/utils';
import type { WebsiteData } from '@quosel/templates';
import { Layout, Palette, RotateCcw, Settings } from 'lucide-react';
import { useState } from 'react';
import { LayoutTab } from './layout-tab';
import { ThemeTab } from './theme-tab';

interface Props {
  data: WebsiteData;
  open: boolean;
}

export function Customizer({ data, open }: Props) {
  const setTweakcnThemeKey = useEditorStore((s) => s.setTweakcnThemeKey);

  const [activeTab, setActiveTab] = useState('layout');

  const handleReset = () => {
    setTweakcnThemeKey('');
  };

  return (
    <div className={cn('shrink-0 overflow-hidden', open ? 'w-120' : 'w-0')}>
      <div className="flex h-full w-120 flex-col border-l">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 rounded-lg p-2">
              <Settings className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold">Customizer</span>
          </div>
          <Button variant="outline" size="icon" onClick={handleReset} className="h-8 w-8 cursor-pointer">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex min-h-0 flex-1 flex-col">
          <TabsList className="flex h-12 rounded-none p-1.5">
            <TabsTrigger value="layout" className="data-[state=active]:bg-background cursor-pointer">
              <Layout className="mr-1 h-4 w-4" /> Layout
            </TabsTrigger>
            <TabsTrigger value="theme" className="data-[state=active]:bg-background cursor-pointer">
              <Palette className="mr-1 h-4 w-4" /> Theme
            </TabsTrigger>
          </TabsList>

          <TabsContent value="layout" className="flex min-h-0 flex-1 flex-col gap-3 overflow-auto p-4">
            <LayoutTab data={data} />
          </TabsContent>

          <TabsContent value="theme" className="flex min-h-0 flex-1 flex-col overflow-auto p-4">
            <ThemeTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
