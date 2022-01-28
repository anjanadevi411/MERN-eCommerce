const express = require("express");
const router = express.Router();

const {
  createProduct,
  //getProduct,
  getProductById,
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//params
router.param("userId", getUserById);
router.param("productId", getProductById);

//actual routes goes here
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//get category by ID
//router.get("/product/:productId", getProduct);
module.exports = router;
