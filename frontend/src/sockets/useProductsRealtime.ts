import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getSocket } from "./socket.ts";

type ProductsChangedPayload = {
  type: "created" | "deleted" | "updated";
  _id?: string;
};

/**
 * Hook que mantém os produtos sincronizados em tempo real.
 * Sempre que o backend emite "products:changed",
 * o React Query invalida a cache de ["products"] e faz refetch automático.
 */
export function useProductsRealtime() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = getSocket();

    const onProductsChanged = (payload: ProductsChangedPayload) => {
      console.log("[Socket] products:changed", payload);
      // Invalida a cache — o React Query refaz automaticamente o fetch
      queryClient.invalidateQueries({ queryKey: ["products"] });
    };

    socket.on("products:changed", onProductsChanged);

    // Limpa o listener ao desmontar o componente
    return () => {
      socket.off("products:changed", onProductsChanged);
    };
  }, [queryClient]);
}
