const { check } = require('express-validator');
const handleValidationErrors = require('./handleValidationErrors');

const validateCardInput = [
    check('term')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 50 })
        .withMessage('Must be at least 1 character long!'),
    
    check('definition')
        .exists({ checkFalsy: true })
        .isLength({ min:1, max: 150 })
        .withMessage('Definition must be at least 1 character long!'),
    handleValidationErrors
]

module.exports = validateCardInput;