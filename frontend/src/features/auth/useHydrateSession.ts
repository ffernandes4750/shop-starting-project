import { useEffect } from "react";
import { fetchMe } from "../../api/auth.ts";
import { useAppDispatch } from "../../redux/hooks.ts";
import { setUser, clearUser } from "../../redux/slices/authSlice.ts";

export function useHydrateSession() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const user = await fetchMe();
        if (!mounted) return;
        if (user) dispatch(setUser(user));
        else dispatch(clearUser());
      } catch {
        if (!mounted) return;
        dispatch(clearUser());
      }
    })();

    return () => {
      mounted = false;
    };
  }, [dispatch]);
}
