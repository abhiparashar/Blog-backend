const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  signout,
  requireSignin
} = require("../controllers/auth");

//validators
const { runValidation } = require("../validators");
const {
  userSignupValidator,
  userSigninValidator
} = require("../validators/auth");

router.post("/signup", signup);
router.post("/signin", userSigninValidator, runValidation, signin);
router.get("/signout", signout);

//test
router.get("/secret", requireSignin, (req, res) => {
  res.json({
    user: req.body
  });
});

module.exports = router;
