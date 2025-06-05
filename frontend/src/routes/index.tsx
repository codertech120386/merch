import { createRootRoute, createRoute } from '@tanstack/react-router';
import Root from './__root';
import SKUList from '../pages/SKUList';
import SKUDetail from '../pages/SKUDetail';
import SKUStatistics from '../pages/SKUStasitics';

export const rootRoute = createRootRoute({
  component: Root,
});

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: SKUList,
});

export const statisticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sku/statistics',
  component: SKUStatistics,
});

export const detailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sku/$id',
  component: SKUDetail,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  detailRoute,
  statisticsRoute,
]);
