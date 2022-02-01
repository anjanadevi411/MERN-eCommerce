import React from "react";
import { Navigate } from "react-router";
import { isAuthenticated } from "./index";

//this is the way how to do private routes in react router dom version6
function PrivateRoutes({ component: Component }) {
  return isAuthenticated() ? <Component /> : <Navigate to={"/signin"} />;
}

export default PrivateRoutes;
