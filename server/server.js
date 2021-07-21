const express = require("express");
const app = express();
const mc = require("mongodb").MongoClient;
const mongoose = require('mongoose');
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const api = require("./routes/api");
const undef = require("./routes/undefined");
const session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);
const port = process.env.PORT;
const path = require('path')

const uri = process.env.ATLAS_URI;

app.use(express.static(path.join(__dirname,"public", "build")));

app.set('trust proxy', 1) // trust first proxy

var store = new MongoDBStore({
    uri: uri,
    collection: 'mySessions'
});

// Catch errors
store.on('error', function (error) {
    console.log(error);
});

app.use(session({
    //Random secret is bad for loadbalancing, and restaring service
    secret: require('crypto').randomBytes(64).toString('hex'),
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false },
    proxy: true,
    store: store
}));


//this middleware us for initializing our session variables on a first request
app.use((req, res, next) => {
    if (!req.session.init) {
        req.session.init = true;
        req.session.validated = false;
    }
    next();
});


app.use(express.json());
app.use("/api", api);
app.use("/*", undef);


app.listen(port, () => {
    console.log("Running in ", process.env.NODE_ENV, " mode")
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("Connected to Database");
    });
});