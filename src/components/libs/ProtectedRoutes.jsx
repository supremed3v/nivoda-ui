import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({ isAuthenticated }) {
  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
}
