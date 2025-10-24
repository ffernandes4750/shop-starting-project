import { useRef } from "react";

import AddProductModal from "./modals/AddProductModal.tsx";
import Product from "./Product.tsx";

import type {
  ProductType,
  NewProductType,
  AddProductModalHandle,
} from "../types/product.ts";

type ShopProps = {
  products: ProductType[];
  onAddProduct: (product: NewProductType) => Promise<ProductType>;
  onRemoveItem: (_id: string) => Promise<void>;
};

export default function Shop({
  products,
  onAddProduct,
  onRemoveItem,
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
              <Product {...product} onRemoveItem={onRemoveItem} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
