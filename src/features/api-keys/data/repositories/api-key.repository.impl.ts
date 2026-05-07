import { IApiKeyRepository } from "../../domain/repositories/api-key.repository";
import type { ApiKey } from "../../domain/entities/api-key";
import { ApiKeyRemoteDataSource } from "../datasources/api-key.remote.datasource";

export class ApiKeyRepositoryImpl extends IApiKeyRepository {
  constructor(private readonly dataSource: ApiKeyRemoteDataSource) {
    super();
  }

  async list(): Promise<ApiKey[]> {
    return this.dataSource.list();
  }

  async create(name: string): Promise<ApiKey> {
    return this.dataSource.create(name);
  }

  async delete(id: string): Promise<void> {
    return this.dataSource.delete(id);
  }
}
