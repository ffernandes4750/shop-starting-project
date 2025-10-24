import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

import Cart from "./Cart.tsx";

import type { CartItem, CartModalHandle } from "../../../types/cart.ts";

type CartModalProps = {
  cartItems: CartItem[];
  onUpdateCartItemQuantity: (_id: string, change: number) => void;
  title: string;
  actions: React.ReactNode;
};

const CartModal = forwardRef<CartModalHandle, CartModalProps>(function Modal(
  { cartItems, onUpdateCartItemQuantity, title, actions },
  ref
) {
  const dialog = useRef<HTMLDialogElement | null>(null);

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current?.showModal();
    },
  }));

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <Cart
        cartItems={cartItems}
        onUpdateItemQuantity={onUpdateCartItemQuantity}
      />
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
});

export default CartModal;
