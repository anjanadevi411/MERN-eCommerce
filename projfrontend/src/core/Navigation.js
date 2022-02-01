import React, { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

function Navigation() {
  let navigate = useNavigate();
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
        {!isAuthenticated() && (
          <Fragment>
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
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  navigate("/");
                });
              }}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
