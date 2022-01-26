require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

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

//Starting the Server
app.listen(port, () => {
  console.log(`App is running at port ${port}`);
});
