import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export function handleApiError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Erro de rede ou comunicação com o servidor.";
    throw new Error(message);
  }

  throw new Error("Erro inesperado ao comunicar com o servidor.");
}

// --- token helper
const TOKEN_KEY = "accessToken";
export function getToken() {
  return localStorage.getItem(TOKEN_KEY) ?? null;
}
export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

// --- anexa Authorization: Bearer <token> em TODAS as requests, se existir
api.interceptors.request.use((config) => {
  const t = getToken();
  if (t) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${t}`;
  }
  return config;
});
