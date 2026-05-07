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

export const ANALYTICS_SCHEMA_VERSION = '1.0';
