const { check } = require("express-validator");

exports.userSignupValidator = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("name is required"),
  check("email")
    .isEmail()
    .withMessage("email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be 6 characters long")
];

exports.userSigninValidator = [
  check("email")
    .isEmail()
    .withMessage("email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be 6 characters long")
];
