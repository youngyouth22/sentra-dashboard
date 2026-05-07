import { createElement, lazy } from 'react';
import { type RouteObject } from 'react-router-dom';
import { RoutePaths } from './route-paths';
import ProtectedRoute from './ProtectedRoute';

const DashboardPage = lazy(() => import('@/features/dashboard/presentation/pages/DashboardPage'));
const ApiKeysPage = lazy(() => import('@/features/api-keys/presentation/pages/ApiKeysPage'));
const TrustAnalyticsPage = lazy(() => import('@/features/trust-analytics/presentation/pages/TrustAnalyticsPage'));
const TransactionsPage = lazy(() => import('@/features/transactions/presentation/pages/TransactionsPage'));
const WebhooksPage = lazy(() => import('@/features/webhooks/presentation/pages/WebhooksPage'));
const SettingsPage = lazy(() => import('@/features/settings/presentation/pages/SettingsPage'));

/**
 * Private Routes
 * Only accessible to authenticated users.
 */
export const PrivateRoutes: RouteObject[] = [
  {
    path: RoutePaths.DASHBOARD,
    element: createElement(
      ProtectedRoute, 
      { redirectTo: RoutePaths.LOGIN }, 
      createElement(DashboardPage)
    ),
  },
  {
    path: RoutePaths.API_KEYS,
    element: createElement(
      ProtectedRoute, 
      { redirectTo: RoutePaths.LOGIN }, 
      createElement(ApiKeysPage)
    ),
  },
  {
    path: RoutePaths.TRUST_ANALYTICS,
    element: createElement(
      ProtectedRoute, 
      { redirectTo: RoutePaths.LOGIN }, 
      createElement(TrustAnalyticsPage)
    ),
  },
  {
    path: RoutePaths.TRANSACTIONS,
    element: createElement(
      ProtectedRoute, 
      { redirectTo: RoutePaths.LOGIN }, 
      createElement(TransactionsPage)
    ),
  },
  {
    path: RoutePaths.WEBHOOKS,
    element: createElement(
      ProtectedRoute, 
      { redirectTo: RoutePaths.LOGIN }, 
      createElement(WebhooksPage)
    ),
  },
  {
    path: RoutePaths.SETTINGS,
    element: createElement(
      ProtectedRoute, 
      { redirectTo: RoutePaths.LOGIN }, 
      createElement(SettingsPage)
    ),
  },
];
