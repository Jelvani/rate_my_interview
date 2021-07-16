const { check, validationResult } = require('express-validator');
const { OAuth2Client } = require('google-auth-library');
require("dotenv").config({ path: "../config.env" });

const client = new OAuth2Client(process.env.CLIENT_ID);


exports.postReview = [
    check('company')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Company name cannot be empty!')
        .isLength({ min: 3 })
        .withMessage('Minimum 3 characters required!')
        .bail(),
    check('review')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Need a review!')
        .bail(),
    check('rating')
        .isInt({ min: 1, max: 5 })
        .withMessage('Need a valid rating (1-5)')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

exports.checkValidation = async (req, res, next) => {
    
    if(!req.session.validated){
        res.sendStatus(400);
        console.log("validation failed!")
    }else{
        next();
    }
};
exports.logout = async (req, res) => {
    if(!req.session.validated){
        res.sendStatus(400);
    }else{
        req.session.destroy();
        res.sendStatus(200);
    }
    
}
exports.google = async (req, res) => {

    const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    
    req.session.validated = true;
    

    res.status(201);
    res.json({userid: payload});
};