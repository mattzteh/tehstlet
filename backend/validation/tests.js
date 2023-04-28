const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateTestInput = [
    check('title')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 50 })
        .withMessage('Title must be at least 5 character long.'),
    
    handleValidationErrors
]

module.exports = validateTestInput;