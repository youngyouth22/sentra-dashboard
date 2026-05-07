export interface ApiKey {
  id: string;
  name: string;
  createdAt: string;
  lastUsedAt: string | null;
  rawKey?: string;
}

// Dummy export to ensure the module has a runtime presence if needed by some tools
export const API_KEY_SCHEMA_VERSION = "1.0";
