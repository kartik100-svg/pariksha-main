import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Context import

function ProtectedRoute({ children, allowedRole }) {

  const { user, isLoggedIn } = useAuth(); // Context se check karo

  // Login nahi hai toh Login page pe bhejo
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Role check — agar allowedRole diya hai aur user ka role match nahi karta
  if (
    allowedRole &&
    user?.role !== allowedRole
  ) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default ProtectedRoute;