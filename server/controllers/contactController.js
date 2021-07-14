//this controller will simply perform the required logic for 
//saving and obtaining reviews from the db. We don't worry about
//routes here, although sometimes the routes and controller are
//merged together in just the routes file.

const Contact = require("../models/contact_entry");

exports.contact_add_entry = async (req, res, next) => {

    const contact = new Contact({
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        reason: req.body.reason,
        date: new Date(),
        ip: req.connection.remoteAddress
    });
    contact.save();
    console.log("saved")
    res.sendStatus(200);
    next();
};
