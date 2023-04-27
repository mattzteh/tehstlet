const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateLoginInput = [
    check('username')
        .exists({ checkFalsy: true })
        .withMessage('Invalid Credentials.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 8, max: 200 })
        .withMessage('Invalid Credentials.'),
        
    handleValidationErrors
]

module.exports = validateLoginInput;