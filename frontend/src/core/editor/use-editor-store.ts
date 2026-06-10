import type { WebsiteData } from '@quosel/templates';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Device = 'laptop' | 'phone';

interface EditorStore {
  initial: WebsiteData | null;
  draft: WebsiteData | null;
  device: Device;
  setDevice: (device: Device) => void;
  hydrate: (data: WebsiteData) => void;
  updateDraft: (data: WebsiteData) => void;
  reset: () => void;
}

export const useEditorStore = create<EditorStore>()(
  persist(
    (set) => ({
      initial: null,
      draft: null,
      device: 'laptop',
      setDevice: (device) => set({ device }),
      hydrate: (data) => set({ draft: structuredClone(data), initial: structuredClone(data) }),
      updateDraft: (data) => set({ draft: data }),
      reset: () => set((s) => ({ draft: s.initial ? structuredClone(s.initial) : null })),
    }),
    {
      name: 'editor',
      partialize: (state) => ({ device: state.device }),
    },
  ),
);
