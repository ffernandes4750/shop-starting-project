import type { CartItem } from "../../../../../types/cart.ts";

type CartProps = {
  cartItems: CartItem[];
  onUpdateItemQuantity: (_id: string, change: number) => void;
};

export default function Cart({ cartItems, onUpdateItemQuantity }: CartProps) {
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div>
      {cartItems.length === 0 && <p>No items in cart!</p>}

      {cartItems.length > 0 && (
        <ul>
          {cartItems.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item._id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div>
                  <button onClick={() => onUpdateItemQuantity(item._id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateItemQuantity(item._id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-3">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
