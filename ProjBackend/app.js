require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

//Auth
const authRoutes = require("./routes/auth");
//User
const userRoutes = require("./routes/user");
//Category
const categoryRoutes = require("./routes/category");
//Product
const productRoutes = require("./routes/product");
//Order
const orderRoutes = require("./routes/order");

//DB connection
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

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//PORT
const port = process.env.PORT || 8000;

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

//Starting the Server
app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});
