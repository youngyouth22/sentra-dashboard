import { type RouteObject } from 'react-router-dom';
import { PublicRoutes } from './public';
import { PrivateRoutes } from './private';
import ErrorPage from '@/core/components/errorPage/ErrorPage';

/**
 * Main Routes Registry
 * 
 * This file consolidates public and private routes into a single
 * configuration object used by the RouterProvider.
 */
export const routes = (): RouteObject[] => {
  return [
    ...PublicRoutes.map(route => ({ ...route, errorElement: <ErrorPage /> })),
    ...PrivateRoutes.map(route => ({ ...route, errorElement: <ErrorPage /> })),
  ];
};