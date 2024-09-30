import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import { RootState } from "../store"; // Import your RootState type

// Define the props type for PrivateRoute
interface PrivateRouteProps {
  children: ReactNode;
}

// PrivateRoute component
const StudentPrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  //   const { userToken } = useSelector((state: RootState) => state.auth);
  const auth = true;
  // If not authenticated, redirect to login page
  if (!auth) {
    return <Navigate to="/auth/login" />;
  }

  // If authenticated, render the children components
  return <>{children}</>;
};

export default StudentPrivateRoute;
