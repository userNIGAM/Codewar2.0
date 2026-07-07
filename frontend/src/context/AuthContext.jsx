import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getAdminMe, loginAdmin, logoutAdmin } from "../api/api";

const AuthContext = createContext(null);

const getStoredToken = () => localStorage.getItem("admin_token");

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getStoredToken());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const savedToken = getStoredToken();

      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await getAdminMe();
        setUser(res.data.user);
      } catch {
        localStorage.removeItem("admin_token");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (credentials) => {
    const res = await loginAdmin(credentials);
    localStorage.setItem("admin_token", res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
    return res;
  };

  const logout = async () => {
    try {
      await logoutAdmin();
    } catch {
      // ignore logout errors and clear the client session
    }

    localStorage.removeItem("admin_token");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
