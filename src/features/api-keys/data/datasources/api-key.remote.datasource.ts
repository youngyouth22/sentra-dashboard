import { apiClient } from "@/core/network/api-client";
import { ApiEndpoints } from "@/core/api/endpoints";
import type { ApiKey } from "../../domain/entities/api-key";

export class ApiKeyRemoteDataSource {
  async list(): Promise<ApiKey[]> {
    return apiClient<ApiKey[]>(ApiEndpoints.API_KEYS.LIST);
  }

  async create(name: string): Promise<ApiKey> {
    return apiClient<ApiKey>(ApiEndpoints.API_KEYS.CREATE, {
      method: "POST",
      body: JSON.stringify({ name }),
    });
  }

  async delete(id: string): Promise<void> {
    await apiClient(ApiEndpoints.API_KEYS.REVOKE(id), {
      method: "DELETE",
    });
  }
}
