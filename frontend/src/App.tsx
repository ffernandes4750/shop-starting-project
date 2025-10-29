import { useEffect } from "react";
import { useAppSelector } from "./redux/hooks.ts";
import { useHydrateSession } from "./features/auth/useHydrateSession.ts";
import HomePage from "./screens/homePage/HomePage.tsx";
import LoginPage from "./screens/LoginPage.tsx";
import { Routes, Route } from "react-router-dom";

function App() {
  const theme = useAppSelector((s) => s.config.theme);
  useHydrateSession();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
