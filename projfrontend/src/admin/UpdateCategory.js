import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link, useParams } from "react-router-dom";
import { getACategory, updateACategory } from "./helper/adminapicall";

function UpdateCategory() {
  //const params = useParams()
  const { categoryId } = useParams();
  const [value, setValue] = useState({ name: "" });
  const { name } = value;
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const preload = (categoryId) => {
    getACategory(categoryId).then((data) => {
      console.log("cate data", data.name);
      if (data?.error) {
        setValue({ ...value, error: data.error });
      } else {
        setValue({
          ...value,
          name: data.name,
        });
      }
    });
  };

  useEffect(() => {
    return preload(categoryId); //if destructured at the top
  }, []);

  const handleChange = (item) => (event) => {
    const value = event.target.value;
    console.log("value", value);
    setError("");
    setValue({ ...value, [item]: value });
  };

  // const handleChange = (event) => {
  //   setError("");
  //   setValue(event.target.value);
  // };

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
    updateACategory(categoryId, user._id, token, value)
      .then((data) => {
        if (data?.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setValue({ ...value, name: "" });
          console.log("success");
        }
      })
      .catch((error) => console.log(error));
  };

  const categoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="lead">Update the Category</label>
          <input
            className="form-control my-3"
            autoFocus
            placeholder="For Ex. Summer"
            type="text"
            onChange={handleChange("name")}
            value={name}
          />
          <button onClick={onSubmit} className="btn btn-outline-info mb-2">
            Update Category
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
      title="Update Category"
      description="Updating the existing category for T-shirts"
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

export default UpdateCategory;
