import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { checkAuthStatus } from "../api/authApi";
export default function ProtectedRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await checkAuthStatus();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Or return a spinner/skeleton loader
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
