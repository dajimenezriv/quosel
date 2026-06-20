import type { Me } from '@/old/auth';
import { createContext } from 'react';

export const SectionControlsContext = createContext<Me | null>(null);
export const SectionControlsProvider = SectionControlsContext.Provider;
