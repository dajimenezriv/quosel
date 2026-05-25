import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import posthog from "posthog-js";
import "./index.css";
import { App } from "./App.tsx";

const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: "https://eu.i.posthog.com",
    defaults: "2026-01-30",
    person_profiles: "identified_only",
    autocapture: false,
    capture_performance: false,
    capture_heatmaps: false,
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
