import React from "react";
import Navigation from "./Navigation";

function Base({
  title = "My title",
  description = "My description",
  className = "text-white bg-dark p-4",
  children,
}) {
  return (
    <div>
      <Navigation />
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-auto">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h6>If you have any query's. Please feel free to contact us</h6>
          <button className="btn btn-warning btn-md">Contact Us</button>
        </div>
        <div className="container">
          <span className="text-muted">
            {" "}
            An Amazing place to shop online{" "}
            <span className="text-white">T-shirts</span>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Base;
