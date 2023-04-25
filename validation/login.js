const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateLoginInput = [
    check('username')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Username is Invalid'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 8, max: 200 })
        .withMessage('Password must be at least 8 characters long.'),
    handleValidationErrors
]

module.exports = validateLoginInput;