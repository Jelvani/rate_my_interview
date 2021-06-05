const { check, validationResult } = require('express-validator');

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