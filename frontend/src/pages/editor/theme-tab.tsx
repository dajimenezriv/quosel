'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Dices, Moon, Sun } from 'lucide-react';
import React, { useState } from 'react';
import { tweakcnThemes } from './theme-data';
import { useThemeManager } from './use-theme-manager';

export function ThemeTab() {
  const { applyTweakcnTheme } = useThemeManager();
  const isDarkMode = useState(false);

  const handleRandomTweakcn = () => {
    const randomTheme = tweakcnThemes[Math.floor(Math.random() * tweakcnThemes.length)];
    applyTweakcnTheme(randomTheme.preset);
  };

  const handleLightMode = (event: React.MouseEvent<HTMLButtonElement>) => {};

  const handleDarkMode = (event: React.MouseEvent<HTMLButtonElement>) => {};

  return (
    <div className="space-y-6 p-4">
      {/* Tweakcn Theme Presets */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Tweakcn Theme Presets</Label>
          <Button variant="outline" size="sm" onClick={handleRandomTweakcn} className="cursor-pointer">
            <Dices className="mr-1.5 h-3.5 w-3.5" />
            Random
          </Button>
        </div>

        <Select
          value={''}
          onValueChange={(value) => {
            const selectedPreset = tweakcnThemes.find((t) => t.value === value)?.preset;
            if (selectedPreset) {
              applyTweakcnTheme(selectedPreset);
            }
          }}>
          <SelectTrigger className="w-full cursor-pointer">
            <SelectValue placeholder="Choose Tweakcn Theme" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            <div className="p-2">
              {tweakcnThemes.map((theme) => (
                <SelectItem key={theme.value} value={theme.value} className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div
                        className="border-border/20 h-3 w-3 rounded-full border"
                        style={{ backgroundColor: theme.preset.styles.light.primary }}
                      />
                      <div
                        className="border-border/20 h-3 w-3 rounded-full border"
                        style={{ backgroundColor: theme.preset.styles.light.secondary }}
                      />
                      <div
                        className="border-border/20 h-3 w-3 rounded-full border"
                        style={{ backgroundColor: theme.preset.styles.light.accent }}
                      />
                      <div
                        className="border-border/20 h-3 w-3 rounded-full border"
                        style={{ backgroundColor: theme.preset.styles.light.muted }}
                      />
                    </div>
                    <span>{theme.name}</span>
                  </div>
                </SelectItem>
              ))}
            </div>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Mode Section */}
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
