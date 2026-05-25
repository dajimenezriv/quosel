"use client";

import React from "react";
import { Layout, Palette, RotateCcw, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useThemeManager } from "@/hooks/use-theme-manager";
import { tweakcnThemes } from "@/config/theme-data";
import { ThemeTab } from "./theme-tab";
import { LayoutTab } from "./layout-tab";
import { cn } from "@/lib/utils";

interface ThemeCustomizerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ThemeCustomizer({ open, onOpenChange }: ThemeCustomizerProps) {
  const { isDarkMode, applyTweakcnTheme } = useThemeManager();
  const [activeTab, setActiveTab] = React.useState("theme");
  const [selectedTweakcnTheme, setSelectedTweakcnTheme] =
    React.useState("claude");

  const handleReset = () => {
    setSelectedTweakcnTheme("");
  };

  React.useEffect(() => {
    if (selectedTweakcnTheme) {
      const selectedPreset = tweakcnThemes.find(
        (t) => t.value === selectedTweakcnTheme,
      )?.preset;
      if (selectedPreset) {
        applyTweakcnTheme(selectedPreset, isDarkMode);
      }
    }
  }, [isDarkMode, selectedTweakcnTheme, applyTweakcnTheme]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent
        side="right"
        className="w-100 p-0 gap-0 pointer-events-auto [&>button]:hidden overflow-hidden flex flex-col"
      >
        <SheetHeader className="space-y-0 p-4 pb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Settings className="h-4 w-4" />
            </div>
            <SheetTitle className="text-lg font-semibold">
              Customizer
            </SheetTitle>
            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleReset}
                className="cursor-pointer h-8 w-8"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="cursor-pointer h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full flex flex-col"
          >
            <div className="py-2">
              <TabsList className="grid w-full grid-cols-2 rounded-none h-12 p-1.5">
                <TabsTrigger
                  value="theme"
                  className="cursor-pointer data-[state=active]:bg-background"
                >
                  <Palette className="h-4 w-4 mr-1" /> Theme
                </TabsTrigger>
                <TabsTrigger
                  value="layout"
                  className="cursor-pointer data-[state=active]:bg-background"
                >
                  <Layout className="h-4 w-4 mr-1" /> Layout
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="theme" className="flex-1 mt-0">
              <ThemeTab
                selectedTweakcnTheme={selectedTweakcnTheme}
                setSelectedTweakcnTheme={setSelectedTweakcnTheme}
              />
            </TabsContent>

            <TabsContent value="layout" className="flex-1 mt-0">
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
        "fixed top-1/2 -translate-y-1/2 h-12 w-12 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer right-4",
      )}
    >
      <Settings className="h-5 w-5" />
    </Button>
  );
}
