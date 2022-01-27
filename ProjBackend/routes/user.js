const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
} = require("../controllers/user");

router.param("userId", getUserById);

//getting user by ID
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

//updating user by ID
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get(
  "orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

module.exports = router;
