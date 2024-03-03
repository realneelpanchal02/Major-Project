const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAysnc = require("../utils/wrapAysnc.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router
  .route("/signup")
  .get(userController.renderSignup)
  .post(wrapAysnc(userController.userSignup));

router
  .route("/login")
  .get(userController.renderLogin)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.userLogin
  ); 

router.get("/logout", userController.userLogout);

module.exports = router;
