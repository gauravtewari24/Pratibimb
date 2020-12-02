const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// ndbc (node data base connection)

mongoose.connect(
  "mongodb+srv://gaurav:gaurav@cluster0.heimk.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);


const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log("server started at 3000 port");
});
