import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

import AdminRoutes from "./admin";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/admin/*"
                    element={
                        <ProtectedRoute>
                            <AdminRoutes />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </AuthProvider>
    );
}

export default App;