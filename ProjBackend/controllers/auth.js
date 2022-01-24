exports.signout = (req, res) => {
  res.json({
    message: "User SignOut",
  });
};

exports.signup = (req, res) => {
  console.log("REQ BODY", req.body);
  res.json({
    message: "User Signed up",
  });
};
