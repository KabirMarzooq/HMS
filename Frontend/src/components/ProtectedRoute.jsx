import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("oncura_token");

  // If there's no token, send them to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If there is a token, let them through to the dashboard
  return <Outlet />;
};

export default ProtectedRoute;