var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

//signup route
router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
    check("email").isEmail().withMessage("email is required"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
  ],
  signup
);

//signin route
router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("email is required"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
  ],
  signin
);

//signout route
router.get("/signout", signout);

//protected route
// router.get("/testroute", isSignedIn, (req, res) => {
//   //res.send("a protected route");
//   res.json(req.auth);
// });

module.exports = router;
