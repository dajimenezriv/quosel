import { Layout, Palette, RotateCcw, Settings, X } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { tweakcnThemes } from '@/config/theme-data';
import { useThemeManager } from '@/hooks/use-theme-manager';
import { cn } from '@/lib/utils';
import { LayoutTab } from './layout-tab';
import { ThemeTab } from './theme-tab';

interface ThemeCustomizerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ThemeCustomizer({ open, onOpenChange }: ThemeCustomizerProps) {
  const { isDarkMode, applyTweakcnTheme } = useThemeManager();
  const [activeTab, setActiveTab] = React.useState('theme');
  const [selectedTweakcnTheme, setSelectedTweakcnTheme] = React.useState('claude');

  const handleReset = () => {
    setSelectedTweakcnTheme('');
  };

  React.useEffect(() => {
    if (selectedTweakcnTheme) {
      const selectedPreset = tweakcnThemes.find((t) => t.value === selectedTweakcnTheme)?.preset;
      if (selectedPreset) {
        applyTweakcnTheme(selectedPreset, isDarkMode);
      }
    }
  }, [isDarkMode, selectedTweakcnTheme, applyTweakcnTheme]);

  return (
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
              <ThemeTab selectedTweakcnTheme={selectedTweakcnTheme} setSelectedTweakcnTheme={setSelectedTweakcnTheme} />
            </TabsContent>

            <TabsContent value="layout" className="mt-0 flex-1">
              <LayoutTab />
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Floating trigger button - positioned dynamically based on sidebar side
export function ThemeCustomizerTrigger({ onClick }: { onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className={cn(
        'bg-primary hover:bg-primary/90 text-primary-foreground fixed top-1/2 right-4 z-50 h-12 w-12 -translate-y-1/2 cursor-pointer rounded-full shadow-lg',
      )}>
      <Settings className="h-5 w-5" />
    </Button>
  );
}
