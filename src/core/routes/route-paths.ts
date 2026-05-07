/**
 * Global Route Path Constants
 * 
 * Centralized source of truth for all application URLs.
 * Following enterprise naming conventions.
 */
export const RoutePaths = {
  // Public
  HOME: '/',
  DOCS: '/docs',
  AUTH: '/auth',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  OTP: '/auth/otp',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  // Private
  DASHBOARD: '/dashboard',
  API_KEYS: '/dashboard/api-keys',
  TRUST_ANALYTICS: '/dashboard/trust-analytics',
  TRANSACTIONS: '/dashboard/transactions',
  WEBHOOKS: '/dashboard/webhooks',
  SETTINGS: '/dashboard/settings',
  
  // Wildcard
  NOT_FOUND: '*',
} as const;
