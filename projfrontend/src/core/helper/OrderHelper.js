import { API } from "../../backend";

export const createOrder = (userId, token, orderDate) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      ACCEPT: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: orderDate }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
