import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarConfigProvider } from "@/contexts/sidebar-context";
import { AppRouter } from "@/components/router/app-router";

export function App() {
  return (
    <div
      className="font-sans antialiased"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <SidebarConfigProvider>
          <Router>
            <AppRouter />
          </Router>
        </SidebarConfigProvider>
      </ThemeProvider>
    </div>
  );
}
