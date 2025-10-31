import { Routes, Route } from "react-router-dom";
import CojmosPage from "./CojmosPage.tsx";
import CojmosLoginPage from "./CojmosLoginPage.tsx";
import CojmosStationPage from "./CojmosStationPage.tsx";

export default function CojmosRoutes() {
  return (
    <Routes>
      <Route index element={<CojmosPage />} />
      <Route path="login" element={<CojmosLoginPage />} />
      <Route path="station/:stationId" element={<CojmosStationPage />} />
    </Routes>
  );
}
