/* eslint-disable react/prop-types */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./auth";
import { getVerify } from "./utils";

export const ProtectedRoute = () => {
  const location = useLocation();
  const pathname = location.pathname || "/";
  const { user } = useAuth();

  const is2FaVerifed = getVerify();
  console.log(is2FaVerifed);
  
  if (!is2FaVerifed) {
    console.log('redirecting to verify-2fa')
    return <Navigate to="/verify-2fa" state={{ myProp: pathname }} replace />;
  }
  if (!user) {
    // user is not authenticated
    return <Navigate to="/sign-in" state={{ pathname }} />;
  }
  return <Outlet />;
};
