import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEditorStore } from '@/core/editor/use-editor-store';
import { Layout, Palette, RotateCcw, Settings, X } from 'lucide-react';
import { useState } from 'react';
import { LayoutTab } from './layout-tab';
import { ThemeTab } from './theme-tab';

interface ThemeCustomizerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Customizer({ open, onOpenChange }: ThemeCustomizerProps) {
  const setTweakcnThemeKey = useEditorStore((s) => s.setTweakcnThemeKey);

  const [activeTab, setActiveTab] = useState('theme');

  const handleReset = () => {
    setTweakcnThemeKey('');
  };

  return (
    <div className={`flex flex-col overflow-hidden border-l transition-[width] duration-300 ${open ? 'w-140' : 'w-0'}`}>
      <div className="p-4 pb-2">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 rounded-lg p-2">
            <Settings className="h-4 w-4" />
          </div>
          <div className="text-lg font-semibold">Customizer</div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleReset} className="h-8 w-8 cursor-pointer">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8 cursor-pointer">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex h-full flex-col">
          <div className="py-2">
            <TabsList className="grid h-12 w-full grid-cols-2 rounded-none p-1.5">
              <TabsTrigger value="theme" className="data-[state=active]:bg-background cursor-pointer">
                <Palette className="mr-1 h-4 w-4" /> Theme
              </TabsTrigger>
              <TabsTrigger value="layout" className="data-[state=active]:bg-background cursor-pointer">
                <Layout className="mr-1 h-4 w-4" /> Layout
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="theme" className="mt-0 flex-1">
            <ThemeTab />
          </TabsContent>

          <TabsContent value="layout" className="mt-0 flex-1">
            <LayoutTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
