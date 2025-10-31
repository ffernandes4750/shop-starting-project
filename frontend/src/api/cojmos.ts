import axios from "axios";
import { handleApiError } from "./api.ts";
import type { StationType } from "../types/station.ts";

const TOKEN_KEY = "cojmos_token";

export const api = axios.create({
  baseURL: "/pub/v1",
  withCredentials: true,
});

const savedToken = localStorage.getItem(TOKEN_KEY);
if (savedToken) {
  api.defaults.headers.common.Authorization = `Bearer ${savedToken}`;
}

export type LoginResponse = {
  access_token: string;
};

export function setCojmosToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function clearCojmosToken() {
  localStorage.removeItem(TOKEN_KEY);
  delete api.defaults.headers.common.Authorization;
}

export function getCojmosToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export async function loginCojmos(
  username: string,
  password: string
): Promise<LoginResponse> {
  try {
    const { data } = await api.post<LoginResponse>("/auth/login", {
      username,
      password,
    });
    if (data?.access_token) {
      setCojmosToken(data.access_token);
    }
    return data;
  } catch (e) {
    handleApiError(e);
  }
}

export async function fetchStations(): Promise<StationType[]> {
  const token = getCojmosToken();
  if (!token) {
    throw new Error(
      "Token não definido. Faz login (loginCojmos) ou chama setCojmosToken antes."
    );
  }

  try {
    const { data } = await api.get<StationType[]>("/station");
    return data;
  } catch (error) {
    handleApiError(error);
  }
}

// LEITURAS
type Variable = {
  id: string;
  value: number;
};

type ReadingWithTimestamp = {
  timestamp: string;
  variables: Variable[];
};

type ApiReading = {
  timestamp: string;
  variables: {
    id: string;
    position: number;
    unit: string;
    value: number;
  }[];
};

export async function fetchReadings(
  stationId: string,
  startDate: Date,
  endDate: Date
): Promise<ReadingWithTimestamp[]> {
  const token = getCojmosToken();
  if (!token) {
    throw new Error(
      "Token não definido. Faz login (loginCojmos) ou chama setCojmosToken antes."
    );
  }

  try {
    const { data } = await api.get<ApiReading[]>(`/reading/${stationId}`, {
      params: {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      },
    });

    console.log(data);

    return data.map((reading) => ({
      timestamp: reading.timestamp,
      variables: reading.variables.map(({ id, value }) => ({ id, value })),
    }));
  } catch (error) {
    handleApiError(error);
  }
}
