const User = require("../models/user");

module.exports.renderSignup = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.userSignup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newuser = new User({ email, username });
    const registerdUser = await User.register(newuser, password);
    console.log(registerdUser);
    req.login(registerdUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.userLogin = async (req, res) => {
  req.flash("success", "Welcome to wandelust! You are logged in!");
  let redirectUrl = req.session.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.userLogout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out successfully!");
    res.redirect("/listings");
  });
};
