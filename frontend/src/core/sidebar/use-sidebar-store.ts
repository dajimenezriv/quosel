import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarStore {
  open: boolean;
  toggleSidebar: () => void;
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      open: true,
      toggleSidebar: () => set((s) => ({ open: !s.open })),
    }),
    {
      name: 'sidebar',
    },
  ),
);
