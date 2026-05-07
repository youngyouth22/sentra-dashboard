import { IWebhookRepository } from "../../domain/repositories/webhook.repository";
import type { WebhookEndpoint } from "../../domain/entities/webhook-endpoint";
import { WebhookRemoteDataSource } from "../datasources/webhook.remote.datasource";

export class WebhookRepositoryImpl extends IWebhookRepository {
  constructor(private readonly dataSource: WebhookRemoteDataSource) {
    super();
  }

  async list(): Promise<WebhookEndpoint[]> {
    return this.dataSource.list();
  }

  async create(url: string, events?: string[]): Promise<WebhookEndpoint> {
    return this.dataSource.create(url, events);
  }

  async delete(id: string): Promise<void> {
    return this.dataSource.delete(id);
  }
}
