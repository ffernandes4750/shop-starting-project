import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, createProduct, deleteProduct } from "./api/products.js";
import { addItemToCart, updateCartItemQuantity } from "./cartUtils.js";

import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";

function App() {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(product) {
    setShoppingCart((prevCart) => addItemToCart(prevCart, product));
  }

  function handleUpdateCartItemQuantity(id, amount) {
    setShoppingCart((prevCart) => updateCartItemQuantity(prevCart, id, amount));
  }

  let message = null;
  if (isLoading) message = <p>A carregar produtos…</p>;
  if (isFetching) message = <p>A produtos…</p>;
  if (isError) message = <p>Erro a obter produtos: {String(error)}</p>;

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
