import { createElement, lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router-dom';
import { RoutePaths } from './route-paths';

// Lazy load components
const LandingPage = lazy(() => import('@/features/landing-page/presentation/page/LandingPage'));
const DocsPage = lazy(() => import('@/features/docs/presentation/page/DocsPage'));
const AuthPage = lazy(() => import('@/features/auth/presentation/pages/AuthPage'));
const LoginPage = lazy(() => import('@/features/auth/presentation/pages/login/LoginPage'));
const SignupPage = lazy(() => import('@/features/auth/presentation/pages/signup/SignupPage'));
const OtpPage = lazy(() => import('@/features/auth/presentation/pages/otp/OtpPage'));
const ForgotPasswordPage = lazy(() => import('@/features/auth/presentation/pages/forgot-password/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@/features/auth/presentation/pages/reset-password/ResetPasswordPage'));

/**
 * Public Routes
 * Configured as a pure data file (.ts) to avoid Fast Refresh conflicts.
 */
export const PublicRoutes: RouteObject[] = [
  {
    path: RoutePaths.HOME,
    element: createElement(LandingPage),
  },
  {
    path: RoutePaths.DOCS,
    element: createElement(DocsPage),
  },
  {
    path: RoutePaths.AUTH,
    element: createElement(AuthPage),
    children: [
      {
        path: RoutePaths.LOGIN,
        element: createElement(LoginPage),
      },
      {
        path: RoutePaths.SIGNUP,
        element: createElement(SignupPage),
      },
      {
        path: RoutePaths.OTP,
        element: createElement(OtpPage),
      },
      {
        path: RoutePaths.FORGOT_PASSWORD,
        element: createElement(ForgotPasswordPage),
      },
      {
        path: RoutePaths.RESET_PASSWORD,
        element: createElement(ResetPasswordPage),
      },
      {
        index: true,
        element: createElement(Navigate, { to: RoutePaths.LOGIN, replace: true }),
      },
    ],
  },
  {
    path: RoutePaths.NOT_FOUND,
    element: createElement(Navigate, { to: RoutePaths.HOME, replace: true }),
  },
];