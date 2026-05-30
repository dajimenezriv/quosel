import { useRef } from 'react';
import { useThemeStore } from '@/core/theme/use-theme-store';

export function useCircularTransition() {
  const { isDarkMode, setIsDarkMode } = useThemeStore();
  const isTransitioningRef = useRef(false);

  function startTransition(coords: { x: number; y: number }, callback: () => void) {
    if (isTransitioningRef.current) return;

    isTransitioningRef.current = true;

    // Set CSS variables for the circular reveal animation - exactly like tweakcn
    const x = (coords.x / window.innerWidth) * 100;
    const y = (coords.y / window.innerHeight) * 100;

    // Set the CSS variables on document element
    document.documentElement.style.setProperty('--x', `${x}%`);
    document.documentElement.style.setProperty('--y', `${y}%`);

    if ('startViewTransition' in document) {
      document
        .startViewTransition(() => callback())
        .finished.finally(() => {
          isTransitioningRef.current = false;
        });
    } else {
      callback();
      isTransitioningRef.current = false;
    }
  }

  function toggleTheme(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const coords = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    startTransition(coords, () => {
      setIsDarkMode(isDarkMode ? false : true);
    });
  }

  return {
    toggleTheme,
  };
}
