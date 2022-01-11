require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("Connection to DB failed");
  });

const port = 8000;

app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});
