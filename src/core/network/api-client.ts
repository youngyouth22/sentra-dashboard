import { getAuthToken } from "@/lib/supabase";

const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/v1` : "http://localhost:3000/v1";
const GATEWAY_KEY = import.meta.env.VITE_GATEWAY_KEY;

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

export const apiClient = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  const { params, headers, ...customConfig } = options;
  
  const url = new URL(`${API_URL}${endpoint}`);
  if (params) {
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  }

  // RÉCUPÉRATION DU TOKEN DEPUIS SUPABASE (AUTOMATIQUE)
  const token = await getAuthToken();
  
  const secureHeaders = new Headers(headers);
  if (customConfig.body) {
    secureHeaders.set("Content-Type", "application/json");
  }
  
  if (GATEWAY_KEY) {
    secureHeaders.set("x-api-key", GATEWAY_KEY);
  }

  if (token) {
    secureHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url.toString(), {
    ...customConfig,
    headers: secureHeaders,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }

  if (response.status === 204) return {} as T;

  return response.json();
};
