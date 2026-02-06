// App router configuration

import { createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { AppLayout } from './components/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { WaterTankPage } from './pages/WaterTankPage';
import { VehicleWorkPage } from './pages/VehicleWorkPage';
import { AccountingPage } from './pages/AccountingPage';
import { ReportsPage } from './pages/ReportsPage';

const rootRoute = createRootRoute({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
});

const waterTankRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/water-tank',
  component: WaterTankPage,
});

const vehicleWorkRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/vehicle-work',
  component: VehicleWorkPage,
});

const accountingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/accounting',
  component: AccountingPage,
});

const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reports',
  component: ReportsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  waterTankRoute,
  vehicleWorkRoute,
  accountingRoute,
  reportsRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
