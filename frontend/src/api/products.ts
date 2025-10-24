import { api } from "./api.js";

import type { NewProductType } from "../types/product.js";

async function fetchProducts() {
  const { data } = await api.get("/products");
  return data;
}

async function createProduct(newProduct: NewProductType) {
  const { data } = await api.post("/products", newProduct);
  return data;
}

async function deleteProduct(productId: string) {
  const { data } = await api.delete(`/products/${productId}`);
  return data;
}

export { fetchProducts, createProduct, deleteProduct };
