// src/features/auth/useHydrateSession.ts
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../../api/auth.ts";
import { useAppDispatch } from "../../redux/hooks.ts";
import { setUser } from "../../redux/slices/authSlice.ts";
import { getToken } from "../../api/api.ts";

export function useHydrateSession() {
  const dispatch = useAppDispatch();
  const hasToken = Boolean(getToken());

  const { data, isSuccess } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: fetchMe,
    enabled: hasToken, // só tenta se houver token
    retry: 1,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess) dispatch(setUser(data ?? null));
    if (!hasToken) dispatch(setUser(null));
  }, [isSuccess, data, hasToken, dispatch]);
}
