import AddProductModal from "./AddProductModal.jsx";
import Product from "./Product.jsx";

import { useRef } from "react";

export default function Shop({ onAddItemToCart, onAddProduct, products }) {
  const modal = useRef();

  function handleAddProductClick() {
    modal.current.open();
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
            <li key={product.id}>
              <Product {...product} onAddToCart={onAddItemToCart} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
