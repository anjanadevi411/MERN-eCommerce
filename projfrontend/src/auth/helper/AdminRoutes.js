import React from "react";
import { Navigate } from "react-router";
import { isAuthenticated } from "./index";

//this is the way how to do private routes in react router dom version6
function AdminRoutes({ component: Component }) {
  return isAuthenticated() && isAuthenticated().user.role === 1 ? (
    <Component />
  ) : (
    <Navigate to={"/signin"} />
  );
}

export default AdminRoutes;
