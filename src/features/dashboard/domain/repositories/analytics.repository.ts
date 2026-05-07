import type { AnalyticsUsage } from "../entities/analytics";

export abstract class IAnalyticsRepository {
  abstract getUsage(): Promise<AnalyticsUsage>;
}
