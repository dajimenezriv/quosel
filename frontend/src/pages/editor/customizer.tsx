import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layout, Palette, RotateCcw, Settings, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { LayoutTab } from './layout-tab';
import { themes } from './theme-data';
import { ThemeTab } from './theme-tab';
import { useThemeManager } from './use-theme-manager';

interface ThemeCustomizerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Customizer({ open, onOpenChange }: ThemeCustomizerProps) {
  const { applyTweakcnTheme } = useThemeManager();

  const [activeTab, setActiveTab] = useState('theme');
  const [selectedTweakcnTheme, setSelectedTweakcnTheme] = useState('');

  const handleReset = () => {
    setSelectedTweakcnTheme('');
  };

  // Re-apply themes when theme mode changes
  useEffect(() => {
    if (selectedTweakcnTheme) {
      const selectedPreset = themes.find((t) => t.key === selectedTweakcnTheme)?.value;
      if (selectedPreset) {
        applyTweakcnTheme(selectedPreset);
      }
    }
  }, [applyTweakcnTheme]);

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
        <SheetContent side="right" className="pointer-events-auto flex w-100 flex-col gap-0 overflow-hidden p-0 [&>button]:hidden">
          <SheetHeader className="space-y-0 p-4 pb-2">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 rounded-lg p-2">
                <Settings className="h-4 w-4" />
              </div>
              <SheetTitle className="text-lg font-semibold">Customizer</SheetTitle>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handleReset} className="h-8 w-8 cursor-pointer">
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8 cursor-pointer">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <SheetDescription className="text-muted-foreground sr-only text-sm">
              Customize the them and layout of your dashboard.
            </SheetDescription>
          </SheetHeader>

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
        </SheetContent>
      </Sheet>
    </>
  );
}
