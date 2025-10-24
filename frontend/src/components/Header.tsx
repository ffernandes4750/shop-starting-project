import { useRef } from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks.ts";
import { updateQuantity } from "../redux/slices/cartSlice.ts";
import CartModal from "./CartModal.tsx";

import type { CartModalHandle } from "../types/cart.ts";

export default function Header() {
  const modal = useRef<CartModalHandle | null>(null);

  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);

  const cartQuantity = items.length;

  function handleOpenCartClick() {
    modal.current?.open();
  }

  let modalActions: React.ReactNode = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal
        ref={modal}
        cartItems={items}
        onUpdateCartItemQuantity={(_id, change) =>
          dispatch(updateQuantity({ _id, change }))
        }
        title="Your Cart"
        actions={modalActions}
      />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}
