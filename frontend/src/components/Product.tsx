import { useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../redux/hooks.ts";
import { addItem } from "../redux/slices/cartSlice.ts";

type ProductProps = {
  _id: string;
  name: string;
  price: number;
  description: string;
  onRemoveItem: (_id: string) => Promise<void>;
};

export default function Product({
  _id,
  name,
  price,
  description,
  onRemoveItem,
}: ProductProps) {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  async function handleRemove(_id: string) {
    await onRemoveItem(_id);
    await queryClient.refetchQueries({ queryKey: ["products"] });
  }

  return (
    <article className="product">
      <div className="product-content">
        <div>
          <h3>{name}</h3>
          <p className="product-price">${price.toFixed(2)}</p>
          <p>{description}</p>
        </div>
        <p className="product-actions">
          <button id="remove-product-button" onClick={() => handleRemove(_id)}>
            Remove
          </button>
          <button onClick={() => dispatch(addItem({ _id, name, price }))}>
            Add to Cart
          </button>
        </p>
      </div>
    </article>
  );
}
