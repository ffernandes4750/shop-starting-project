import { api } from "./api.js";

async function fetchProducts() {
  const { data } = await api.get("/products");
  return data;
}

async function createProduct(newProduct) {
  const { data } = await api.post("/products", newProduct);
  return data;
}

async function deleteProduct(productId) {
  const { data } = await api.delete(`/products/${productId}`);
  return data;
}

export { fetchProducts, createProduct, deleteProduct };
