import { Navbar, Container, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks.ts";
import { updateQuantity } from "../redux/slices/cartSlice.ts";
import CartModal from "./modals/CartModal/CartModal.tsx";

export default function Header() {
  const [theme, setTheme] = useState<"light" | "dark">(
    (document.documentElement.dataset.theme as "light" | "dark") || "light"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const [showCart, setShowCart] = useState(false);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((s) => s.cart);
  const cartQuantity = cart.items.length;

  return (
    <>
      <CartModal
        show={showCart}
        onHide={() => setShowCart(false)}
        cartItems={cart.items}
        onUpdateCartItemQuantity={(_id, change) =>
          dispatch(updateQuantity({ _id, change }))
        }
        title="Your Cart"
      />

      <Navbar expand="lg" className="mb-4 border-bottom">
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar.Brand className="d-flex align-items-center gap-3">
            <img src="logo.png" alt="Elegant model" width={70} height={70} />
            <span>Elegant Context</span>
          </Navbar.Brand>

          <div className="d-flex align-items-center gap-2">
            <Button
              variant="secondary"
              onClick={toggleTheme}
              title="Alternar tema"
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </Button>

            <Button variant="primary" onClick={() => setShowCart(true)}>
              Cart ({cartQuantity})
            </Button>
          </div>
        </Container>
      </Navbar>
    </>
  );
}
