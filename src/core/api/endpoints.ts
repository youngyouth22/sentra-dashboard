/**
 * Sentra Gateway — Centralized API Endpoints
 *
 * Single source of truth for every endpoint consumed by the dashboard.
 * All paths are relative to the base URL defined in the environment.
 *
 * Base URL  : import.meta.env.VITE_API_URL
 * Versioned : /v1 prefix is added by the apiClient automatically
 *
 * Usage:
 *   import { ApiEndpoints, GatewayBaseUrl } from '@/core/api/endpoints';
 *   apiClient(ApiEndpoints.AUTH.LOGIN, { method: 'POST', body: ... });
 */

/** Resolved base URL from the environment (falls back to localhost for dev) */
export const GatewayBaseUrl: string =
  import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

/** Public URL of the OpenAPI JSON spec (used by the Docs page) */
export const ApiDocsUrl: string =
  import.meta.env.VITE_API_DOCS_URL ??
  `${GatewayBaseUrl}/docs/json`;

// ─────────────────────────────────────────────────────────────────────────────
// Endpoint paths (relative, without /v1 prefix — added by apiClient)
// ─────────────────────────────────────────────────────────────────────────────

export const ApiEndpoints = {
  // ── Authentication ──────────────────────────────────────────────────────────
  AUTH: {
    /** POST /v1/auth/login — Authenticate user and return JWT */
    LOGIN: '/auth/login',
    /** POST /v1/auth/register — Create a new user account */
    REGISTER: '/auth/register',
    /** POST /v1/auth/logout — Invalidate the current session */
    LOGOUT: '/auth/logout',
    /** POST /v1/auth/refresh — Refresh the access token */
    REFRESH: '/auth/refresh',
    /** POST /v1/auth/forgot-password — Trigger password reset email */
    FORGOT_PASSWORD: '/auth/forgot-password',
    /** POST /v1/auth/reset-password — Apply the new password */
    RESET_PASSWORD: '/auth/reset-password',
    /** POST /v1/auth/otp/verify — Verify an OTP code */
    OTP_VERIFY: '/auth/otp/verify',
  },

  // ── Users ────────────────────────────────────────────────────────────────────
  USERS: {
    /** GET /v1/users — List all users (admin) */
    LIST: '/users',
    /** GET /v1/users/:id — Get a single user profile */
    GET: (id: string) => `/users/${id}`,
    /** PATCH /v1/users/:id — Update user profile */
    UPDATE: (id: string) => `/users/${id}`,
    /** DELETE /v1/users/:id — Soft-delete a user */
    DELETE: (id: string) => `/users/${id}`,
  },

  // ── API Keys ─────────────────────────────────────────────────────────────────
  API_KEYS: {
    /** GET /v1/api-keys — List API keys for the authenticated tenant */
    LIST: '/api-keys',
    /** POST /v1/api-keys — Create a new API key */
    CREATE: '/api-keys',
    /** DELETE /v1/api-keys/:id — Revoke an API key */
    REVOKE: (id: string) => `/api-keys/${id}`,
  },

  // ── Analytics ────────────────────────────────────────────────────────────────
  ANALYTICS: {
    /** GET /v1/analytics/overview — High-level traffic & usage metrics */
    OVERVIEW: '/analytics/overview',
    /** GET /v1/analytics/requests — Time-series request volume */
    REQUESTS: '/analytics/requests',
    /** GET /v1/analytics/errors — Error rate breakdown */
    ERRORS: '/analytics/errors',
  },

  // ── Tenants (Enterprise) ─────────────────────────────────────────────────────
  TENANTS: {
    /** GET /v1/tenants/me — Current tenant profile */
    ME: '/tenants/me',
    /** PATCH /v1/tenants/me — Update tenant settings */
    UPDATE: '/tenants/me',
    /** GET /v1/tenants — List all tenants (super-admin) */
    LIST: '/tenants',
  },

  // ── Network Security (Nokia-as-Code) ─────────────────────────────────────────
  NETWORK: {
    /** GET /v1/network/fraud-check — Real-time fraud detection status */
    FRAUD_CHECK: '/network/fraud-check',
    /** GET /v1/network/sim-swap — SIM swap detection for a MSISDN */
    SIM_SWAP: '/network/sim-swap',
    /** GET /v1/network/device-status — Device location / status */
    DEVICE_STATUS: '/network/device-status',
  },

  // ── Health ───────────────────────────────────────────────────────────────────
  HEALTH: {
    /** GET /health — Gateway liveness check (no /v1 prefix) */
    PING: '/health',
  },

  // ── Documentation ────────────────────────────────────────────────────────────
  DOCS: {
    /** Public OpenAPI JSON spec — rendered by the Docs page */
    JSON: ApiDocsUrl,
    /** Interactive ReDoc UI (hosted separately by the gateway) */
    UI: `${GatewayBaseUrl}/docs`,
  },
} as const;
