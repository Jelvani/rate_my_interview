//this serves as our model for each contact entry in our db
//allows us to access mongoose object that we can send data
//to db with.

const mongoose = require("mongoose");

const contact = new mongoose.Schema({
	firstName: String,
	lastName: String,
    email: String,
    reason: String,
    date: Date,
    ip: String
});

module.exports = mongoose.model("Contact", contact);