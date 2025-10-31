import { useEffect, Suspense, lazy } from "react";
import { useAppSelector } from "./redux/hooks.ts";
import HomePage from "./screens/HomePage.tsx";
import LoginPage from "./screens/LoginPage.tsx";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CojmosRoutes = lazy(() => import("./screens/cojmos/CojmosRoutes.tsx"));

function App() {
  const theme = useAppSelector((s) => s.config.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/cojmos/*"
          element={
            <Suspense fallback={<div>Carregando COJMOS…</div>}>
              <CojmosRoutes />
            </Suspense>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
