import { Navbar, Container, Button } from "react-bootstrap";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks.ts";
import { updateQuantity } from "../../../redux/slices/cartSlice.ts";
import { setUser } from "../../../redux/slices/authSlice.ts";
import CartModal from "./modals/cartModal/CartModal.tsx";
import { useNavigate } from "react-router-dom";
import { toggleTheme } from "../../../redux/slices/configSlice.ts";

import { VscAccount } from "react-icons/vsc";
import { BsCart2 } from "react-icons/bs";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((s) => s.cart);
  const user = useAppSelector((s) => s.auth.user);

  const [showCart, setShowCart] = useState(false);

  // -------------------------------- THEME CODE ----------------------------------
  const theme = useAppSelector((s) => s.config.theme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  // --------------------------------     X     -----------------------------------

  function handleLogout() {
    localStorage.removeItem("accessToken");
    dispatch(setUser(null));
    navigate("/login");
  }

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
              className="icon-btn"
              variant="secondary"
              onClick={handleToggleTheme}
              title="Alternar tema"
            >
              {theme === "light" ? <MdDarkMode /> : <MdOutlineLightMode />}
            </Button>

            <Button className="icon-btn" onClick={() => setShowCart(true)}>
              <BsCart2 /> ({cart.items.length})
            </Button>
            {user ? (
              <>
                <span className="me-2">
                  Olá, <strong>{user.name}</strong>
                </span>
                <Button
                  className="icon-btn"
                  variant="outline-secondary"
                  onClick={handleLogout}
                  title="Sair"
                >
                  Sair
                </Button>
              </>
            ) : (
              <Button
                className="icon-btn"
                onClick={() => navigate("/login")}
                title="Entrar"
              >
                <VscAccount />
              </Button>
            )}
          </div>
        </Container>
      </Navbar>
    </>
  );
}
