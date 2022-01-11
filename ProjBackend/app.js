const express = require("express");
const mongoose = require("mongoose");

const app = express();
const DB_Name = "t-shirt";
mongoose
  .connect(`mongodb://localhost:27017/${DB_Name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

const port = 8000;

app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});
