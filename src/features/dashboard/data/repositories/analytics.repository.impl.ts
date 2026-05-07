import { IAnalyticsRepository } from "../../domain/repositories/analytics.repository";
import type { AnalyticsUsage } from "../../domain/entities/analytics";
import { AnalyticsRemoteDataSource } from "../datasources/analytics.remote.datasource";

export class AnalyticsRepositoryImpl extends IAnalyticsRepository {
  constructor(private readonly dataSource: AnalyticsRemoteDataSource) {
    super();
  }

  async getUsage(): Promise<AnalyticsUsage> {
    return this.dataSource.getUsage();
  }
}
