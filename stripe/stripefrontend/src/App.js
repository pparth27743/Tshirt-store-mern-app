import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import StripeCheckout from "react-stripe-checkout";

function App() {
  const [product, setproduct] = useState({
    name: "React from FB",
    price: 10,
    productBy: "facebook",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`http://localhost:8820/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("RESPONSE ", response);
        const { status } = response;
        console.log("STATUS ", status);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
        <StripeCheckout
          stripeKey="pk_test_O2MgyfjY7uYPbgX8CfAB2K4F00zWk1u09O"
          token={makePayment}
          name="Buy React"
          amount={product.price * 100}
        >
          <button className="btn-large indigo">
            {" "}
            Buy react is just for {product.price}
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
