import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService";
import { getToken, setToken, removeToken, isTokenPresent } from "../utils/storage";
import { ROUTES } from "../constants";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const navigate = useNavigate();

  // Load user from token on mount
  const loadUser = useCallback(async () => {
    if (!isTokenPresent()) {
      setLoading(false);
      return;
    }
    try {
      // Add a timeout so the app doesn't hang forever on Render cold starts
      const userData = await Promise.race([
        authService.getCurrentUser(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timeout")), 10000)
        ),
      ]);
      setUser(userData);
    } catch (err) {
      removeToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (credentials) => {
    setAuthError(null);
    try {
      const data = await authService.loginUser(credentials);
      setToken(data.accesstoken);
      const userData = await authService.getCurrentUser();
      setUser(userData);
      navigate(ROUTES.DASHBOARD);
      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      setAuthError(message);
      return { success: false, message };
    }
  };

  const register = async (userData) => {
    setAuthError(null);
    try {
      await authService.registerUser(userData);
      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.message || "Registration failed. Please try again.";
      setAuthError(message);
      return { success: false, message };
    }
  };

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    navigate(ROUTES.LOGIN);
  }, [navigate]);

  const clearError = () => setAuthError(null);

  const value = {
    user,
    loading,
    authError,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
