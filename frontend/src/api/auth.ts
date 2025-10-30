import { api, handleApiError } from "./api.ts";
import type { User } from "../types/user.ts";
export async function login(email: string, password: string): Promise<User> {
  try {
    const { data } = await api.post("/auth/login", { email, password });
    // O cookie fica guardado automaticamente pelo browser.
    return data.user as User;
  } catch (e) {
    handleApiError(e);
  }
}

export async function logout(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch (e) {
    handleApiError(e);
  }
}

export async function fetchMe(): Promise<User | null> {
  try {
    const { data } = await api.get("/auth/me");
    return (data?.user as User) ?? null;
  } catch (e) {
    handleApiError(e);
  }
}
