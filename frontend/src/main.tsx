import posthog from 'posthog-js';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import './index.css';
import { env } from './core/env.ts';

if (env.VITE_POSTHOG_KEY) {
  posthog.init(env.VITE_POSTHOG_KEY, {
    api_host: 'https://eu.i.posthog.com',
    defaults: '2026-01-30',
    person_profiles: 'identified_only',
    autocapture: false,
    capture_performance: false,
    capture_heatmaps: false,
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
