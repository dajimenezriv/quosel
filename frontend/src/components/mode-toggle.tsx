import { Moon, Sun } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import '@/core/theme/circular-transition.css';
import { useCircularTransition } from '@/core/theme/use-circular-transition';
import { useThemeStore } from '@/core/theme/use-theme-store';

export function ModeToggle() {
  const { theme } = useThemeStore();
  const { toggleTheme } = useCircularTransition();

  // Simple, reliable dark mode detection with re-sync
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    const updateMode = () => {
      if (theme === 'dark') {
        setIsDarkMode(true);
      } else if (theme === 'light') {
        setIsDarkMode(false);
      } else {
        setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
      }
    };

    updateMode();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateMode);

    return () => mediaQuery.removeEventListener('change', updateMode);
  }, [theme]);

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className="mode-toggle-button relative cursor-pointer overflow-hidden">
      {/* Show the icon for the mode you can switch TO */}
      {isDarkMode ? (
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-transform duration-300" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-transform duration-300" />
      )}
      <span className="sr-only">Switch to {isDarkMode ? 'light' : 'dark'} mode</span>
    </Button>
  );
}
