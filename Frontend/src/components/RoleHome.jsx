import { Navigate } from "react-router-dom";

export default function RoleHome() {
  const savedUser = localStorage.getItem("oncura_user");
  if (!savedUser) return <Navigate to="/login" replace />;

  const { role } = JSON.parse(savedUser);

  // Define the "Home" path for each role
  const roleDefaults = {
    patient: "/dashboard/my-appointments",
    doctor: "/dashboard/patients",
    admin: "/dashboard/users",
    receptionist: "/dashboard/appointments",
    pharmacy: "/dashboard/prescriptions",
  };

  // Redirect to the role's default, or fallback to logout/login
  const targetPath = roleDefaults[role.toLowerCase()] || "/login";

  return <Navigate to={targetPath} replace />;
}
