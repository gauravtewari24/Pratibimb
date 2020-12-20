var mongoose = require("mongoose");

const userData = new mongoose.Schema({
    name: String,
    data: String,
    email: String,
    sentimantal_score: String,
    Week_sentimantal_score: String,
    Week_yogic_score: String,
    Week_medic_score: String,
});

module.exports = mongoose.model("Item", UserData);
