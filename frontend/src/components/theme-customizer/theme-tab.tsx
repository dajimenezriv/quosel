import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useThemeManager } from "@/hooks/use-theme-manager";
import { tweakcnThemes } from "@/config/theme-data";
import type { ImportedTheme } from "@/types/theme-customizer";
import "./circular-transition.css";

interface ThemeTabProps {
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
  selectedTweakcnTheme: string;
  setSelectedTweakcnTheme: (theme: string) => void;
  selectedRadius: string;
  setSelectedRadius: (radius: string) => void;
  setImportedTheme: (theme: ImportedTheme | null) => void;
  onImportClick: () => void;
}

export function ThemeTab({
  setSelectedTheme,
  selectedTweakcnTheme,
  setSelectedTweakcnTheme,
  setImportedTheme,
}: ThemeTabProps) {
  const { isDarkMode, setBrandColorsValues, applyTweakcnTheme } =
    useThemeManager();

  return (
    <div className="p-4 space-y-6">
      {/* Tweakcn Theme Presets */}
      <div className="space-y-3">
        <Select
          value={selectedTweakcnTheme}
          onValueChange={(value) => {
            setSelectedTweakcnTheme(value);
            setSelectedTheme(""); // Clear shadcn selection
            setBrandColorsValues({}); // Clear brand colors state
            setImportedTheme(null); // Clear imported theme
            const selectedPreset = tweakcnThemes.find(
              (t) => t.value === value,
            )?.preset;
            if (selectedPreset) {
              applyTweakcnTheme(selectedPreset, isDarkMode);
            }
          }}
        >
          <SelectTrigger className="w-full cursor-pointer">
            <SelectValue placeholder="Choose Tweakcn Theme" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            <div className="p-2">
              {tweakcnThemes.map((theme) => (
                <SelectItem
                  key={theme.value}
                  value={theme.value}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div
                        className="w-3 h-3 rounded-full border border-border/20"
                        style={{
                          backgroundColor: theme.preset.styles.light.primary,
                        }}
                      />
                      <div
                        className="w-3 h-3 rounded-full border border-border/20"
                        style={{
                          backgroundColor: theme.preset.styles.light.secondary,
                        }}
                      />
                      <div
                        className="w-3 h-3 rounded-full border border-border/20"
                        style={{
                          backgroundColor: theme.preset.styles.light.accent,
                        }}
                      />
                      <div
                        className="w-3 h-3 rounded-full border border-border/20"
                        style={{
                          backgroundColor: theme.preset.styles.light.muted,
                        }}
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
    </div>
  );
}
