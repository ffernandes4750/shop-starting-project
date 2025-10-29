import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  createProduct,
  deleteProduct,
} from "../../api/products.ts";

import Header from "./components/Header.tsx";
import Shop from "./components/Shop.tsx";

import type { ProductType } from "../../types/product.ts";

export default function HomePage() {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery<ProductType[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  let message: React.ReactNode = null;
  if (isLoading) message = <p>A carregar produtos…</p>;
  if (isFetching) message = <p>A atualizar produtos…</p>;
  if (isError) message = <p>Erro a obter produtos: {error.message}</p>;

  return (
    <>
      <Header />
      {message}
      <Shop
        products={products}
        onAddProduct={createProduct}
        onRemoveItem={deleteProduct}
      />
    </>
  );
}
