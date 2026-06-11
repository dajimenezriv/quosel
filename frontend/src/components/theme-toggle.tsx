import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import '@/core/theme/circular-transition.css';
import { useThemeStore } from '@/core/theme/use-theme-store';

export function ThemeToggle() {
  const { isDarkMode, setIsDarkMode } = useThemeStore();

  function toggleTheme() {
    setIsDarkMode(isDarkMode ? false : true);
  }

  const Icon = isDarkMode ? Sun : Moon;

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className="cursor-pointer">
      <Icon className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  );
}
