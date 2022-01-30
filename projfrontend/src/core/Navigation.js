import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link className="nav-link" to={"/"}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/"}>
            Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/"}>
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/"}>
            Admin Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/"}>
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/"}>
            Sign In
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/"}>
            Sign Out
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
