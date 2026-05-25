import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AppRouter } from "@/components/router/app-router";

export function App() {
  return (
    <div
      className="font-sans antialiased"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Router>
          <AppRouter />
        </Router>
      </ThemeProvider>
    </div>
  );
}
