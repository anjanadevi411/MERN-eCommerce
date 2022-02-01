import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <NavLink
            style={(isActive) => ({
              color: isActive ? "green" : "blue",
            })}
            className="nav-link"
            to={"/"}
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            style={(isActive) => ({
              color: isActive ? "green" : "blue",
            })}
            className="nav-link"
            to={"/cart"}
          >
            Cart
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            style={(isActive) => ({
              color: isActive ? "green" : "blue",
            })}
            className="nav-link"
            to={"/user/dashboard"}
          >
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            style={(isActive) => ({
              color: isActive ? "green" : "blue",
            })}
            className="nav-link"
            to={"/admin/dashboard"}
          >
            Admin Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            style={(isActive) => ({
              color: isActive ? "green" : "blue",
            })}
            className="nav-link"
            to={"/signup"}
          >
            Sign Up
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            style={(isActive) => ({
              color: isActive ? "green" : "blue",
            })}
            className="nav-link"
            to={"/signin"}
          >
            Sign In
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            style={(isActive) => ({
              color: isActive ? "green" : "blue",
            })}
            className="nav-link"
            to={"/signout"}
          >
            Sign Out
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
