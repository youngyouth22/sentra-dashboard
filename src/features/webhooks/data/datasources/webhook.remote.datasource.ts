import { apiClient } from "@/core/network/api-client";
import type { WebhookEndpoint } from "../../domain/entities/webhook-endpoint";

export class WebhookRemoteDataSource {
  async list(): Promise<WebhookEndpoint[]> {
    return apiClient<WebhookEndpoint[]>("/webhooks/endpoints");
  }

  async create(url: string, events: string[] = ["*"]): Promise<WebhookEndpoint> {
    return apiClient<WebhookEndpoint>("/webhooks/endpoints", {
      method: "POST",
      body: JSON.stringify({ url, events }),
    });
  }

  async delete(id: string): Promise<void> {
    await apiClient(`/webhooks/endpoints/${id}`, {
      method: "DELETE",
    });
  }
}
