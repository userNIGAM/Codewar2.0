import { Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./pages/Dashboard";
import Sponsors from "./pages/Sponsors";
import SupportedBy from "./pages/SupportedBy";
import Countdown from "./pages/Countdown";
import Awards from "./pages/Awards";
import WinnersAdmin from "./components/Winner";
import Advisor from "./pages/Advisor";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />

        <Route path="sponsors" element={<Sponsors />} />

        <Route path="supported-by" element={<SupportedBy />} />

        <Route path="countdown" element={<Countdown />} />
        <Route path="awards" element={<Awards />} />
        <Route path="winners" element={<WinnersAdmin />} />
        <Route path="advisors" element={<Advisor />} />


      </Route>
    </Routes>
  );
}
