import { useRef } from "react";

import AddProductModal from "./AddProductModal.tsx";
import Product from "./Product.tsx";

import type {
  ProductType,
  NewProductType,
  AddProductModalHandle,
} from "../types/product.ts";

type ShopProps = {
  products: ProductType[];
  onAddProduct: (product: NewProductType) => Promise<unknown>;
  removeItem: (_id: string) => Promise<unknown>;
};

export default function Shop({
  products,
  onAddProduct,
  removeItem,
}: ShopProps) {
  const modal = useRef<AddProductModalHandle | null>(null);

  function handleAddProductClick() {
    modal.current?.open();
  }

  return (
    <>
      <AddProductModal ref={modal} onAddProduct={onAddProduct} />
      <section id="shop">
        <h2>Elegant Clothing For Everyone</h2>

        <p className="product-add">
          <button onClick={handleAddProductClick}>Add Product</button>
        </p>

        <ul id="products">
          {products.map((product) => (
            <li key={product._id}>
              <Product {...product} removeItem={removeItem} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
