//this controller will simply perform the required logic for 
//saving and obtaining reviews from the db. We don't worry about
//routes here, although sometimes the routes and controller are
//merged together in just the routes file.

const Review = require("../models/review_entry");
var wordFilter = require('bad-words');
filter = new wordFilter();

exports.review_add_post = async (req, res, next) => {

    const review = new Review({
        company: req.body.company,
        review: req.body.review,
        rating: req.body.rating,
        date: new Date(),
        ip: req.connection.remoteAddress
    });
    review.save();
    res.sendStatus(200);
    next();
};


exports.reviews_get = async (req, res, next) => {


    const result = await Review.find({}, { company: 1, review: 1, rating: 1, date: 1 });

    let resultJson = JSON.parse(JSON.stringify(result));

    resultJson.forEach(function (entry, i){
        if (!(entry.company || entry.review || entry.date || entry.rating)) {
            return; //same as 'continue' in normal loop
        }
        
        resultJson[i].company = filter.clean(entry.company);
        resultJson[i].review = filter.clean(entry.review);
        resultJson[i].date = entry.date//.toDateString();
        //fix date format issue
    });
    res.json(resultJson);
    next();
};


