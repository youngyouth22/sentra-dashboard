import type { ApiKey } from "../entities/api-key";

export abstract class IApiKeyRepository {
  abstract list(): Promise<ApiKey[]>;
  abstract create(name: string): Promise<ApiKey>;
  abstract delete(id: string): Promise<void>;
}
