export interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  signing_secret?: string;
}

export const WEBHOOK_SCHEMA_VERSION = '1.0';
