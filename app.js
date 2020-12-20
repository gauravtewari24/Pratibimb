const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const _ = require("lodash");
const User = require('./models/users');

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// passport setup

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/Login", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// get request

app.get("/yogic", function (req, res) {
  res.render("yogic");
});

app.get("/yogic_choices", function (req, res) {
  res.render("yogic_choice");
});

app.get("/medic", function (req, res) {
  if(req.isAuthenticated()){
    res.render("medic");
  }else{
    res.redirect("/login");
  }
});
app.get("/emotion", function (req, res) {
  res.render("emotion");
});

app.get("/", function (req, res) {
  res.render("landing");
});


// auth routes

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/forgot-pass", function (req, res) {
  res.render("404");
  console.log("Not made");
});

app.post("/login", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email+ " " +password);



  res.redirect("/medic");
});

app.post("/register", function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email+ "reg" + "\n");

  var newUser = new User({ username: req.body.username });
  User.register(newUser, password, function(err, user){
    if(err){
      console.log(err);
      res.redirect("/register");
    }else{
      passport.authenticate("local")(req, res, function(){
        res.redirect("/medic");
      });
    }
  });
});

// 
// post request

// connection started here
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log("port started successfully");
});
