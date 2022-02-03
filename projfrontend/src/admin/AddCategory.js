import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

function AddCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const successMsg = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };

  const warningMsg = () => {
    if (error) {
      return <h4 className="text-warning">Failed to create category</h4>;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data?.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName("");
          console.log("success");
        }
      })
      .catch((error) => console.log(error));
  };

  const categoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="lead">Enter the Category</label>
          <input
            className="form-control my-3"
            autoFocus
            placeholder="For Ex. Summer"
            type="text"
            onChange={handleChange}
            value={name}
          />
          <button onClick={onSubmit} className="btn btn-outline-info mb-2">
            Create Category
          </button>

          <Link
            className="btn btn-outline-info mb-2 ms-2"
            to={"/admin/dashboard"}
          >
            Admin Home
          </Link>
        </div>
      </form>
    );
  };
  return (
    <Base
      title="Add Category"
      description="Adding new category for T-shirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMsg()}
          {warningMsg()}
          {categoryForm()}
        </div>
      </div>
    </Base>
  );
}

export default AddCategory;
