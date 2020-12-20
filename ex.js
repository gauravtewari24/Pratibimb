const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const _ = require("lodash");
const request = require("request");
(User = require("./models/users.js")),
(passport = require("passport")),
(LocalStrategy = require("passport-local"));
var flash = require("connect-flash"),
methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());

mongoose
  .connect(
    "mongodb://localhost:27017/Pratibimb",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.log(error.message));

app.use(
  require("express-session")({
    secret: "Once again the monsoon arrives!",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// 

app.get("/", function (req, res) {
  res.render("landing");
});

app.get("/dash", function (req, res) {
  res.render("landing");
});

app.get("/medic", function (req, res) {
  res.render("landing");
});

app.get("/yogic", function (req, res) {
  res.render("landing");
});

app.get("/sentimental", function (req, res) {
  res.render("landing");
});


app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/logout", function (req, res) {
  console.log(req.user);
  req.logout();
  req.flash("success", "Logged Out !! Successfully ");
  res.redirect("/");
});

// 

app.post("/register", function (req, res) {
  var newUser = new User({ username: req.body.username });

  User.register(newUser, req.body.password, function (err, user) {
    
    if (err) {
      req.flash("error", err.message);
      console.log(err);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, function () {
      req.flash("success", "Welcome to Medi-Doc " + req.user.username);
      res.redirect("/medic");
    });
  });
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dash",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res) {
    const usern = req.body.username;
    console.log(error + success);
    req.flash("success", "Logged in !! Successfully ");
  }
);



function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be Logged In!");
  res.redirect("/login");
}

// connection started here
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log("port started successfully");
});
