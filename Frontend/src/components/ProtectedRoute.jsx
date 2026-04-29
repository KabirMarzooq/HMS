import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("oncura_token");

  // If there is no token, send user to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If there is a token, let user through to the dashboard
  return <Outlet />;
};

export default ProtectedRoute;