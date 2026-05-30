import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from '@/components/router/app-router';
import { useTheme } from './core/theme/use-theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: false,
    },
  },
});

export function App() {
  useTheme();

  return (
    <div className="font-sans antialiased" style={{ fontFamily: 'var(--font-inter)' }}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppRouter />
        </Router>
      </QueryClientProvider>
    </div>
  );
}
