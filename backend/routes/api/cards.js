require('../../models/Card');
require('../../models/Test');

const express = require('express');
const { json } = require('express');
const { Result } = require('express-validator');
const router = express.Router();

const mongoose = require('mongoose');
const Card = mongoose.model('Card');
const Test = mongoose.model('Test');
const { requireUser } = require('../../config/passport')
const validateCardInput = require('../../validation/cards');

// GET api/cards/

router.get('/:cardId', async(req, res, next) => {
    try {
        const card = await Card.findById(req.params.roodId)
            .populate('test', '_id, test')
        return res.json(card);
    }
    catch(_err) {
        const err = new Error('Card in test not found.');
        err.statusCode = 404;
        err.errors = { message: 'Card in test not found.' }
        return next(err);
    }
})

