import { Navbar, Container, Button } from "react-bootstrap";
import { useState, useCallback, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../redux/hooks.ts";
import { updateQuantity } from "../redux/slices/cartSlice.ts";
import { clearUser } from "../redux/slices/authSlice.ts";
import CartModal from "./modals/cartModal/CartModal.tsx";
import { useNavigate } from "react-router-dom";
import { toggleTheme } from "../redux/slices/configSlice.ts";
import { logout } from "../api/auth.ts";

// --- Font Awesome Imports ---
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faMoon,
  faSun,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

type HeaderProps = {
  cojmosMode: boolean;
  name: string;
};

export default function Header({ cojmosMode, name }: HeaderProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((s) => s.cart);
  const user = useAppSelector((s) => s.auth.user);

  const [showCart, setShowCart] = useState(false);

  // -------------------------------- THEME CODE ----------------------------------
  const theme = useAppSelector((s) => s.config.theme);
  const handleToggleTheme = () => dispatch(toggleTheme());
  // --------------------------------     X     -----------------------------------

  const isLoggingOut = useRef(false);
  const handleLogout = useCallback(async () => {
    if (isLoggingOut.current) return;
    isLoggingOut.current = true;
    try {
      await logout();
      dispatch(clearUser());
      navigate("/login");
    } catch (err) {
      console.error("Erro ao terminar sessão:", err);
    } finally {
      isLoggingOut.current = false;
    }
  }, [dispatch, navigate]);

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
            {!cojmosMode && (
              <img src="logo.png" alt="Elegant model" width={70} height={70} />
            )}
            <span>{name}</span>
          </Navbar.Brand>

          <div className="d-flex align-items-center gap-5">
            <Button
              className="icon-btn"
              variant="secondary"
              onClick={handleToggleTheme}
              title="Alternar tema"
            >
              <FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
            </Button>

            {!cojmosMode && (
              <Button
                className="icon-btn"
                variant="secondary"
                onClick={() => setShowCart(true)}
                title="Carrinho"
              >
                <FontAwesomeIcon icon={faCartShopping} /> ({cart.items.length})
              </Button>
            )}

            {user && !cojmosMode ? (
              <>
                <span className="hello-user-span">
                  Olá, <strong>{user.name}</strong>
                </span>
                <Button
                  className="icon-btn"
                  variant="primary"
                  onClick={handleLogout}
                  title="Sair"
                  disabled={isLoggingOut.current}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </Button>
              </>
            ) : (
              <Button
                className="icon-btn"
                variant="primary"
                onClick={
                  cojmosMode
                    ? () => navigate("/cojmos/login")
                    : () => navigate("/login")
                }
                title="Entrar"
              >
                <FontAwesomeIcon icon={faUser} />
              </Button>
            )}
          </div>
        </Container>
      </Navbar>
    </>
  );
}
