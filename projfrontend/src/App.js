import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoutes from "./auth/helper/AdminRoutes";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      {/* private routes version 6 */}
      <Route
        path="/admin/dashboard"
        element={<AdminRoutes component={AdminDashBoard} />}
      />
      <Route
        path="/admin/create/category"
        element={<AdminRoutes component={AddCategory} />}
      />
      <Route
        path="/user/dashboard"
        element={<PrivateRoutes component={UserDashBoard} />}
      />
    </Routes>
  );
}

export default App;
