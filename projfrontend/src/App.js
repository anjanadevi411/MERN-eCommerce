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
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";

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
        path="/user/dashboard"
        element={<PrivateRoutes component={UserDashBoard} />}
      />
      <Route
        path="/admin/create/category"
        element={<AdminRoutes component={AddCategory} />}
      />
      <Route
        path="/admin/categories"
        element={<AdminRoutes component={ManageCategories} />}
      />
      <Route
        path="/admin/create/product"
        element={<AdminRoutes component={AddProduct} />}
      />
      <Route
        path="/admin/products"
        element={<AdminRoutes component={ManageProducts} />}
      />
    </Routes>
  );
}

export default App;
