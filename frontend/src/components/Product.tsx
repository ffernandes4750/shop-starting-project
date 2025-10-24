import type { ProductType } from "../types/product.ts";

type ProductProps = {
  _id: string;
  title: string;
  price: number;
  description: string;
  onAddItemToCart: (_id: string) => void;
  removeItem: (_id: string) => void;
};

export default function Product({
  _id,
  title,
  price,
  description,
  onAddItemToCart,
  removeItem,
}: ProductProps) {
  return (
    <article className="product">
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className="product-price">${price.toFixed(2)}</p>
          <p>{description}</p>
        </div>
        <p className="product-actions">
          <button id="remove-product-button" onClick={() => removeItem(_id)}>
            Remove
          </button>
          <button onClick={() => onAddItemToCart(_id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
