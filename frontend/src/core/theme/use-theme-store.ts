import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDarkMode: true,
      setIsDarkMode: (isDarkMode) => set({ isDarkMode }),
    }),
    {
      name: 'theme',
    },
  ),
);
