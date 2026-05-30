import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { routes, type RouteConfig } from '@/config/routes';

function renderRoutes(routeConfigs: RouteConfig[]) {
  return routeConfigs.map((route, index) => (
    <Route key={route.path + index} path={route.path} element={<Suspense fallback={<LoadingSpinner />}>{route.element}</Suspense>} />
  ));
}

export function AppRouter() {
  return <Routes>{renderRoutes(routes)}</Routes>;
}
