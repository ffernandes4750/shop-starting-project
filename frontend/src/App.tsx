import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, createProduct, deleteProduct } from "./api/products.ts";
import { addItemToCart, updateCartItemQuantity } from "./utils/cartUtils.ts";

import Header from "./components/Header.tsx";
import Shop from "./components/Shop.tsx";

import type { ProductType } from "./types/product.ts";
import type { Cart } from "./types/cart.ts";

function App() {
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

  const [shoppingCart, setShoppingCart] = useState<Cart>({
    items: [],
  });

  function handleAddItemToCart(_id: string) {
    setShoppingCart((prevCart) => addItemToCart(_id, prevCart, products));
  }

  function handleUpdateCartItemQuantity(productId: string, amount: number) {
    setShoppingCart((prevCart) =>
      updateCartItemQuantity(productId, amount, prevCart)
    );
  }

  let message: React.ReactNode = null;
  if (isLoading) message = <p>A carregar produtos…</p>;
  if (isFetching) message = <p>A atualizar produtos…</p>;
  if (isError) message = <p>Erro a obter produtos: {error.message}</p>;

  return (
    <>
      <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      {message}
      <Shop
        onAddItemToCart={handleAddItemToCart}
        onAddProduct={createProduct}
        products={products}
        removeItem={deleteProduct}
      />
    </>
  );
}

export default App;
