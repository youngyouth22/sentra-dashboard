import { useState, useCallback, useEffect } from "react";
import type { AnalyticsUsage } from "../../domain/entities/analytics";
import { AnalyticsRepositoryImpl } from "../../data/repositories/analytics.repository.impl";
import { AnalyticsRemoteDataSource } from "../../data/datasources/analytics.remote.datasource";
import { toast } from "sonner";

const repository = new AnalyticsRepositoryImpl(new AnalyticsRemoteDataSource());

export function useAnalytics() {
  const [usage, setUsage] = useState<AnalyticsUsage | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUsage = useCallback(async () => {
    setLoading(true);
    try {
      const data = await repository.getUsage();
      setUsage(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load dashboard metrics");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsage();
  }, [fetchUsage]);

  return {
    usage,
    loading,
    refresh: fetchUsage,
  };
}
