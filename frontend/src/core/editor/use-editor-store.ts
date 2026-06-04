import type { WebsiteData } from '@quosel/templates';
import { produce } from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Device = 'laptop' | 'phone';

interface EditorStore {
  initial: WebsiteData | null;
  draft: WebsiteData | null;
  device: Device;
  setDevice: (device: Device) => void;
  hydrate: (data: WebsiteData) => void;
  reset: () => void;
  isDirty: () => boolean;
  setIsDarkMode: (value: boolean) => void;
  setTweakcnThemeKey: (key: string) => void;
}

export const useEditorStore = create<EditorStore>()(
  persist(
    (set, get) => ({
      initial: null,
      draft: null,
      device: 'laptop',
      setDevice: (device) => set({ device }),
      hydrate: (data) => set({ draft: structuredClone(data), initial: structuredClone(data) }),
      reset: () => set((s) => ({ draft: s.initial ? structuredClone(s.initial) : null })),
      isDirty: () => JSON.stringify(get().draft) !== JSON.stringify(get().initial),
      setIsDarkMode: (value) =>
        set(
          produce((state: EditorStore) => {
            if (state.draft) state.draft.isDarkMode = value;
          }),
        ),
      setTweakcnThemeKey: (key) =>
        set(
          produce((state: EditorStore) => {
            if (state.draft) state.draft.tweakcnThemeKey = key;
          }),
        ),
    }),
    {
      name: 'editor',
      partialize: (state) => ({ device: state.device }),
    },
  ),
);
