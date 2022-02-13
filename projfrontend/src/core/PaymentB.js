import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cartEmpty, loadCart } from "./helper/CartHelper";
import { getMeToken, processPayment } from "./helper/PaymentBHelper";
import createOrder from "./helper/OrderHelper";
import { isAuthenticated } from "../auth/helper";

import DropIn from "braintree-web-drop-in-react";

function PaymentB({ products, setReload = (f) => f, reload = undefined }) {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getMeToken(userId, token).then((info) => {
      console.log("Information", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        console.log("getToken", info.clientToken);
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-success btn-block" onClick={() => {}}>
              Buy
            </button>
          </div>
        ) : (
          <h3>Please Login or add something to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  return (
    <div>
      <h3>PaymentB</h3>
      {showbtDropIn()}
    </div>
  );
}

export default PaymentB;
