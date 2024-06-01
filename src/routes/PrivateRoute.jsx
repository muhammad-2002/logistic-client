import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../components/shared/CustomHook/useAuth";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  if (user) {
    return children;
  }

  <Navigate to="/login" state={location.state}></Navigate>;
};

export default PrivateRoute;
