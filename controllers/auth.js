const User = require("../models/user");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({ error: "Email is already taken" });
    }

    const { name, email, password } = req.body;
    let userName = shortId.generate();
    let profile = `${process.env.CLIENT_URL}/ profile / ${userName}`;

    let newUser = new User({ name, email, password, profile, userName });
    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      //res.json({ user: success });
      res.json({
        message: "You have signed up succesfully,Please sign in"
      });
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  //check if the user exist
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user with this mail does not exist.Please sign up"
      });
    }

    //authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match"
      });
    }

    //Generate a token and send it to the client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });
    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, userName, name, email, role } = user;
    return res.json({
      token,
      user: _id,
      userName,
      name,
      email,
      role
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "signout success"
  });
};

exports.requireSignin = expressJwt({
  secret: "process.env.JWT_SECRET"
});
