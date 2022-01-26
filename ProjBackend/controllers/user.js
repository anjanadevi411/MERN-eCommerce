const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in the DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  // for frontend no need to show password, salt, createdAt ...
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err || !users) {
      return res.status(400).json({
        error: "No such User",
      });
    }
    res.json(users);
  });
};
