import { apiClient } from "@/core/network/api-client";
import type { AnalyticsUsage } from "../../domain/entities/analytics";

export class AnalyticsRemoteDataSource {
  async getUsage(): Promise<AnalyticsUsage> {
    return apiClient<AnalyticsUsage>("/analytics/usage");
  }
}
