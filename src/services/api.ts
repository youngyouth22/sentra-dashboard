import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://sentra-gateway.onrender.com';
const API_KEY = import.meta.env.VITE_GATEWAY_KEY;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  },
});

export interface AnalyticsUsage {
  totalRequests: number;
  successCount: number;
  errorCount: number;
  avgResponseTime: number;
  requestsByEndpoint: Record<string, number>;
  lastRequests: Array<{
    id: string;
    endpoint: string;
    statusCode: number;
    responseTime: number;
    createdAt: string;
  }>;
}

export interface ApiKey {
  id: string;
  name: string;
  createdAt: string;
  lastUsedAt: string | null;
  rawKey?: string;
}

export interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  signing_secret?: string;
}

export const analyticsService = {
  getUsage: async () => {
    const response = await api.get<AnalyticsUsage>('/v1/analytics/usage');
    return response.data;
  },
};

export const apiKeysService = {
  list: async () => {
    const response = await api.get<ApiKey[]>('/v1/api-keys');
    return response.data;
  },
  create: async (name: string) => {
    const response = await api.post<ApiKey>('/v1/api-keys', { name });
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/v1/api-keys/${id}`);
  },
};

export const webhooksService = {
  list: async () => {
    const response = await api.get<WebhookEndpoint[]>('/v1/webhooks/endpoints');
    return response.data;
  },
  create: async (url: string, events: string[] = ['*']) => {
    const response = await api.post<WebhookEndpoint>('/v1/webhooks/endpoints', { url, events });
    return response.data;
  },
  delete: async (id: string) => {
    await api.delete(`/v1/webhooks/endpoints/${id}`);
  },
};

export default api;
