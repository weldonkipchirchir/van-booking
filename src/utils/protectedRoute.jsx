/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "./auth";
export const ProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/sign-in" />;
  }
  return (
    <Outlet />
  )
};