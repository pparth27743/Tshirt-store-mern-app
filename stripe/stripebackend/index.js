const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_fVZT1vFd802VIULXqpJxozg100S2XD3z32");
const uuid = require("uuid/v4");

const app = express();

//middleware

app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("It works...");
});

app.post("/payment", (req, res) => {
  const { product, token } = req.body;
  console.log("PRODUCT", product);
  console.log("PRICE", product.price);

  // So we can charge customer only once
  const idempontencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase of ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

//listen
app.listen(8820, () => console.log("LISTEING AT PORT 8820"));
