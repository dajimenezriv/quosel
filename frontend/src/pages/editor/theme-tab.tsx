import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useEditorStore } from '@/core/editor/use-editor-store';
import { Dices, Moon, Sun } from 'lucide-react';
import { themes } from './theme-data';

export function ThemeTab() {
  const isDarkMode = useEditorStore((s) => s.draft?.isDarkMode ?? false);
  const tweakcnThemeKey = useEditorStore((s) => s.draft?.tweakcnThemeKey ?? '');
  const setIsDarkMode = useEditorStore((s) => s.setIsDarkMode);
  const setTweakcnThemeKey = useEditorStore((s) => s.setTweakcnThemeKey);

  const handleRandomTweakcn = () => {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    setTweakcnThemeKey(randomTheme.key);
  };

  const handleLightMode = () => setIsDarkMode(false);

  const handleDarkMode = () => setIsDarkMode(true);

  return (
    <div className="space-y-6">
      {/* Tweakcn Theme Presets */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Themes</Label>
          <Button variant="outline" size="sm" onClick={handleRandomTweakcn} className="cursor-pointer">
            <Dices className="mr-1.5 h-3.5 w-3.5" />
            Random
          </Button>
        </div>

        <Select
          value={tweakcnThemeKey}
          onValueChange={(key) => {
            setTweakcnThemeKey(key);
          }}>
          <SelectTrigger className="w-full cursor-pointer">
            <SelectValue placeholder="Choose Tweakcn Theme" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            <div className="p-2">
              {themes.map((theme) => (
                <SelectItem key={theme.key} value={theme.key} className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div
                        className="border-border/20 h-3 w-3 rounded-full border"
                        style={{ backgroundColor: theme.value.light.primary }}
                      />
                      <div
                        className="border-border/20 h-3 w-3 rounded-full border"
                        style={{ backgroundColor: theme.value.light.secondary }}
                      />
                      <div className="border-border/20 h-3 w-3 rounded-full border" style={{ backgroundColor: theme.value.light.accent }} />
                      <div className="border-border/20 h-3 w-3 rounded-full border" style={{ backgroundColor: theme.value.light.muted }} />
                    </div>
                    <span>{theme.key}</span>
                  </div>
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="space-y-3">
        <Label className="text-sm font-medium">Mode</Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={!isDarkMode ? 'secondary' : 'outline'}
            size="sm"
            onClick={handleLightMode}
            className="mode-toggle-button relative cursor-pointer overflow-hidden">
            <Sun className="mr-1 h-4 w-4 transition-transform duration-300" />
            Light
          </Button>
          <Button
            variant={isDarkMode ? 'secondary' : 'outline'}
            size="sm"
            onClick={handleDarkMode}
            className="mode-toggle-button relative cursor-pointer overflow-hidden">
            <Moon className="mr-1 h-4 w-4 transition-transform duration-300" />
            Dark
          </Button>
        </div>
      </div>
    </div>
  );
}
