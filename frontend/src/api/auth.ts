// src/api/auth.ts
import { api, setToken } from "./api.ts";

export type Role = "admin" | "user";
export type AuthUser = { id: string; name: string; email: string; role: Role };

export async function login(email: string, password: string) {
  const { data } = await api.post<{ accessToken: string; user: AuthUser }>(
    "/auth/login",
    { email, password }
  );
  setToken(data.accessToken);
  return data.user;
}

export async function fetchMe() {
  const { data } = await api.get<{ user: AuthUser | null }>("/auth/me");
  return data.user;
}
