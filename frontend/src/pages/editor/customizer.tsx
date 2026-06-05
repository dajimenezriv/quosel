import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEditorStore } from '@/core/editor/use-editor-store';
import { cn } from '@/lib/utils';
import type { WebsiteData } from '@quosel/templates';
import { Layout, Palette, RotateCcw, Settings, X } from 'lucide-react';
import { useState } from 'react';
import { LayoutTab } from './layout-tab';
import { ThemeTab } from './theme-tab';

interface Props {
  data: WebsiteData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Customizer({ data, open, onOpenChange }: Props) {
  const setTweakcnThemeKey = useEditorStore((s) => s.setTweakcnThemeKey);

  const [activeTab, setActiveTab] = useState('layout');

  const handleReset = () => {
    setTweakcnThemeKey('');
  };

  return (
    <div className={cn('flex flex-col border-l transition-[width] duration-300', `${open ? 'w-120' : 'w-0'}`)}>
      <div className="p-4 pb-2">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 rounded-lg p-2">
            <Settings className="h-4 w-4" />
          </div>
          <div className="text-lg font-semibold">Customizer</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleReset} className="h-8 w-8 cursor-pointer">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8 cursor-pointer">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="py-2">
          <TabsList className="flex h-12 w-full rounded-none p-1.5">
            <TabsTrigger value="layout" className="data-[state=active]:bg-background cursor-pointer">
              <Layout className="mr-1 h-4 w-4" /> Layout
            </TabsTrigger>
            <TabsTrigger value="theme" className="data-[state=active]:bg-background cursor-pointer">
              <Palette className="mr-1 h-4 w-4" /> Theme
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="layout">
          <LayoutTab data={data} />
        </TabsContent>

        <TabsContent value="theme">
          <ThemeTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
