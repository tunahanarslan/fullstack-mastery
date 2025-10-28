import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import type { ReactElement } from "react";

export default function ProtectedRoute({ children }: { children: ReactElement }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
