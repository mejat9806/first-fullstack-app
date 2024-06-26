import { UserContext } from "@/context/userContext";
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function PrivateRoute() {
  const { user } = useContext(UserContext);
  const location = useLocation();

  // Assuming auth.user.user.email checks if the user is logged in.
  // Adjust this condition based on your authentication logic.
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default PrivateRoute;
