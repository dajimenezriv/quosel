import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MonitorIcon } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Logo } from './components/logo';
import { useTheme } from './core/theme/use-theme';
import { router } from './pages/router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const minWidthQuery = window.matchMedia('(min-width: 1048px)');

function useIsScreenBigEnough() {
  return useSyncExternalStore(
    (onChange) => {
      minWidthQuery.addEventListener('change', onChange);
      return () => minWidthQuery.removeEventListener('change', onChange);
    },
    () => minWidthQuery.matches,
  );
}

function ScreenTooSmall() {
  return (
    <div className="bg-background text-foreground flex h-full w-full">
      <header className="absolute top-4 left-4">
        <Logo size={32} />
      </header>
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="flex max-w-md flex-col items-center gap-3 text-center">
          <MonitorIcon className="text-muted-foreground size-12" />
          <h1 className="font-serif text-4xl font-bold">Screen too small</h1>
          <p className="text-muted-foreground text-sm">
            Quosel is a website editor and needs a screen at least 1048px wide. Please open it on a bigger screen.
          </p>
        </div>
      </main>
    </div>
  );
}

export function App() {
  useTheme();
  const isScreenBigEnough = useIsScreenBigEnough();

  if (!isScreenBigEnough) {
    return <ScreenTooSmall />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
