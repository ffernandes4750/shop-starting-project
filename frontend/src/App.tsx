import { useEffect } from "react";
import { useAppSelector } from "./redux/hooks.ts";
import HomePage from "./screens/HomePage.tsx";
import LoginPage from "./screens/LoginPage.tsx";
import CojmosPage from "./screens/cojmos/CojmosPage.tsx";
import CojmosLoginPage from "./screens/cojmos/CojmosLoginPage.tsx";
import CojmosStationPage from "./screens/cojmos/CojmosStationPage.tsx";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const theme = useAppSelector((s) => s.config.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cojmos" element={<CojmosPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cojmos/login" element={<CojmosLoginPage />} />
        <Route
          path="/cojmos/station/:stationId"
          element={<CojmosStationPage />}
        />
      </Routes>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
