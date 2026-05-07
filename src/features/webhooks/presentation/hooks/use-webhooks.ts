import { useState, useCallback, useEffect } from "react";
import type { WebhookEndpoint } from "../../domain/entities/webhook-endpoint";
import { WebhookRepositoryImpl } from "../../data/repositories/webhook.repository.impl";
import { WebhookRemoteDataSource } from "../../data/datasources/webhook.remote.datasource";
import { toast } from "sonner";

const repository = new WebhookRepositoryImpl(new WebhookRemoteDataSource());

export function useWebhooks() {
  const [endpoints, setEndpoints] = useState<WebhookEndpoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchEndpoints = useCallback(async () => {
    setLoading(true);
    try {
      const data = await repository.list();
      setEndpoints(data);
    } catch (error: any) {
      toast.error(error.message || "Failed to load webhooks");
    } finally {
      setLoading(false);
    }
  }, []);

  const addWebhook = async (url: string) => {
    setIsCreating(true);
    try {
      const newWebhook = await repository.create(url);
      setEndpoints((prev) => [...prev, newWebhook]);
      toast.success("Webhook endpoint added");
      return newWebhook;
    } catch (error: any) {
      toast.error(error.message || "Failed to add webhook");
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  const deleteWebhook = async (id: string) => {
    setIsDeleting(true);
    try {
      await repository.delete(id);
      setEndpoints((prev) => prev.filter((e) => e.id !== id));
      toast.success("Webhook deleted");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete webhook");
      throw error;
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchEndpoints();
  }, [fetchEndpoints]);

  return {
    endpoints,
    loading,
    isCreating,
    isDeleting,
    addWebhook,
    deleteWebhook,
    refresh: fetchEndpoints,
  };
}
