const express = require("express");
const app = express();
const mc = require("mongodb").MongoClient;
const mongoose = require('mongoose');
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const routes = require("./routes/routes");
var session = require('express-session')
const port = process.env.PORT;



// var wordFilter = require('bad-words');
// filter = new wordFilter();

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use("/",routes);

//this middleware us for initializing our session variables on a first request
app.use((req, res, next) => {
    if(!req.session.init){
        req.session.init = true;
        req.session.validated = false;
    }
    next();
});
const uri = process.env.ATLAS_URI;




// let db = null;
// let collection = null;
// app.get("/", (req, res) => {
//     collection.find().project({ company: 1, review: 1, rating: 1, date: 1 })
//         .toArray(function (err, result) {
//             if (err) throw err;
//             //TODO: optimize this process, maybe dont check every time.
//             //we filter each company name and review

//             result.forEach(function (entry, i) {
//                 if (!(entry.company || entry.review || entry.date || entry.rating)) {
//                     return; //same as 'continue' in normal loop
//                 }
//                 result[i].company = filter.clean(entry.company);
//                 result[i].review = filter.clean(entry.review);
//                 console.log(entry.date.toDateString());
//                 result[i].date = entry.date.toDateString();
//             });
//             res.json(result);
//         });
// }); 

// app.post("/add", (req, res) => {
//     let entry = {
//         company: req.body.comp,
//         review: req.body.review,
//         rating: req.body.rating,
//         date: new Date(),
//         ip: req.connection.remoteAddress
//     };

//     collection.insertOne(entry)
//         .then(result => {
//             console.log("Inserted entry!");
//         })
//         .catch(error => console.error(error));
// });

app.listen(port, () => {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    // mc.connect(uri).then(client => {
    //     console.log("Connected to Databse");
    //     db = client.db('userData');
    //     collection = db.collection("reviews");
    // })
    //     .catch(error => console.error(error));
    // console.log(`Server is running on port: ${port}`);
    const db = mongoose.connection;
    //db.useDb('userData');
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("Connected to Database");
    });
    
});