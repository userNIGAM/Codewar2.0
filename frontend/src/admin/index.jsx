import { Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./pages/Dashboard";
import Sponsors from "./pages/Sponsors";

export default function AdminRoutes() {
    return (
        <Routes>

            <Route element={<AdminLayout />}>

                <Route
                    path="/"
                    element={<Dashboard />}
                />

                <Route
                    path="sponsors"
                    element={<Sponsors />}
                />

            </Route>

        </Routes>
    );
}