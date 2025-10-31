import { Modal, Button } from "react-bootstrap";

import Cart from "./Cart.tsx";

import type { CartItem } from "../../../types/cart.ts";

type CartModalProps = {
  show: boolean;
  onHide: () => void;
  cartItems: CartItem[];
  onUpdateCartItemQuantity: (_id: string, change: number) => void;
  title: string;
};

export default function CartModal({
  show,
  onHide,
  cartItems,
  onUpdateCartItemQuantity,
  title,
}: CartModalProps) {
  const hasItems = cartItems.length > 0;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Cart
          cartItems={cartItems}
          onUpdateItemQuantity={onUpdateCartItemQuantity}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="success" disabled={!hasItems} onClick={onHide}>
          Checkout
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
