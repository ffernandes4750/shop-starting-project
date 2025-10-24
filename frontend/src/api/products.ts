import { api, handleApiError } from "./api.ts";
import type { NewProductType, ProductType } from "../types/product.ts";

async function fetchProducts(): Promise<ProductType[]> {
  try {
    const { data } = await api.get<ProductType[]>("/products");
    return data;
  } catch (error) {
    handleApiError(error);
  }
}

async function createProduct(newProduct: NewProductType): Promise<ProductType> {
  try {
    const { data } = await api.post<ProductType>("/products", newProduct);
    return data;
  } catch (error) {
    handleApiError(error);
  }
}

async function deleteProduct(productId: string): Promise<void> {
  try {
    await api.delete(`/products/${productId}`);
  } catch (error) {
    handleApiError(error);
  }
}

export { fetchProducts, createProduct, deleteProduct };
