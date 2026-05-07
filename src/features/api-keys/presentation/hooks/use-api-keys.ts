import { useState, useCallback, useEffect } from "react";
import type { ApiKey } from "../../domain/entities/api-key";
import { ApiKeyRepositoryImpl } from "../../data/repositories/api-key.repository.impl";
import { ApiKeyRemoteDataSource } from "../../data/datasources/api-key.remote.datasource";
import { toast } from "sonner";

const repository = new ApiKeyRepositoryImpl(new ApiKeyRemoteDataSource());

export function useApiKeys() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchKeys = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await repository.list();
      setKeys(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch API keys");
      toast.error("Failed to load API keys");
    } finally {
      setLoading(false);
    }
  }, []);

  const createKey = async (name: string) => {
    setIsCreating(true);
    try {
      const newKey = await repository.create(name);
      setKeys((prev) => [newKey, ...prev]);
      toast.success("API key created successfully");
      return newKey;
    } catch (err: any) {
      toast.error(err.message || "Failed to create API key");
      throw err;
    } finally {
      setIsCreating(false);
    }
  };

  const deleteKey = async (id: string) => {
    setIsDeleting(true);
    try {
      await repository.delete(id);
      setKeys((prev) => prev.filter((k) => k.id !== id));
      toast.success("API key revoked");
    } catch (err: any) {
      toast.error(err.message || "Failed to revoke API key");
      throw err;
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, [fetchKeys]);

  return {
    keys,
    loading,
    error,
    isCreating,
    isDeleting,
    refresh: fetchKeys,
    createKey,
    deleteKey,
  };
}
