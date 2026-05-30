import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import '@/core/theme/circular-transition.css';
import { useCircularTransition } from '@/core/theme/use-circular-transition';
import { useThemeStore } from '@/core/theme/use-theme-store';

export function ModeToggle() {
  const { isDarkMode } = useThemeStore();
  const { toggleTheme } = useCircularTransition();

  const Icon = isDarkMode ? Sun : Moon;

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className="mode-toggle-button relative cursor-pointer overflow-hidden">
      <Icon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-transform duration-300" />
      <span className="sr-only">Switch to {isDarkMode ? 'light' : 'dark'} mode</span>
    </Button>
  );
}
