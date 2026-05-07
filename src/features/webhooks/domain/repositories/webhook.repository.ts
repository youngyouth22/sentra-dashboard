import type { WebhookEndpoint } from "../entities/webhook-endpoint";

export abstract class IWebhookRepository {
  abstract list(): Promise<WebhookEndpoint[]>;
  abstract create(url: string, events?: string[]): Promise<WebhookEndpoint>;
  abstract delete(id: string): Promise<void>;
}
