import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
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
