import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Base from "../core/Base";
import {
  getAllCategories,
  getAProduct,
  updateAProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

function UpdateProduct() {
  //const params = useParams()
  const { productId } = useParams();
  //console.log("params", productId);
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getARedirect: false,
    formData: "",
  });
  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getARedirect,
    formData,
  } = values;

  const preloadCategories = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };
  const preload = (productId) => {
    if (!productId) return;
    getAProduct(productId).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories();
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          category: data.category._id,
          price: data.price,
          stock: data.stock,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    //return preload(params.productId); //if not destructured
    return preload(productId); //if destructured at the top
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    //updateAProduct(params.productId, user._id, token, formData).then((data) => {
    updateAProduct(productId, user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name,
        });
      }
    });
  };

  const successMsg = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} Updated successfully</h4>
    </div>
  );
  const errorMsg = () => {
    <div
      className="alert alert-success mt-3"
      style={{ display: error ? "" : "none" }}
    >
      <h4>Error in createing the product</h4>
    </div>;
  };
  const updateProductForm = () => (
    <form>
      <span>Upload photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success form-control mb-3">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="name"
          className="form-control mb-3"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="description"
          className="form-control mb-3"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control mb-3"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control mb-3"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control mb-3"
          placeholder="Stock"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a product"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to={"/admin/dashboard"} className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMsg()}
          {errorMsg()}
          {updateProductForm()}
        </div>
      </div>
    </Base>
  );
}

export default UpdateProduct;
