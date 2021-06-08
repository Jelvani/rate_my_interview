//this serves as our model for each review entry in our db
//allows us to access mongoose object that we can send data
//to db with.

const mongoose = require("mongoose");

const review = new mongoose.Schema({
	company: String,
	review: String,
    rating: Number,
    date: Date,
    ip: String
});

module.exports = mongoose.model("Review", review);