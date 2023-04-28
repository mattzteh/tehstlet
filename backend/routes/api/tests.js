require('../../models/User');
require('../../models/Test');
require('../../models/Card');

const express = require('express');
const { json } = require('express');
const { Result } = require('express-validator');
const router = express.Router();

const mongoose = require('mongoose');
const Test = mongoose.model('Test');
const Card = mongoose.model('Card');
const { requireUser } = require('../../config/passport');
const validateTestInput = require('../../validation/tests');
const validateCardInput = require('../../validation/cards');


router.get('/', async (_req, res) => {
    try {
        const tests = await Test.find()
            .populate('creator', '_id, username')
            .sort({ createdAt: -1 })
        return res.json(tests);
    }
    catch(_err) {
        return res.json([])
    }
})

router.get('/:testId', async(req, res, next) => {
    try {
        const test = await Test.findById(req.params.testId)
            .populate('creator', '_id, username')
        return res.json(test);
    }
    catch(_err) {
        const err = new Error("Test not found.");
        err.statusCode = 404;
        err.errors = { message: 'No test found.'};
        return next(err);
    }
})

// POST api/tests/create (create new test collection)
router.post('/create', requireUser, validateTestInput, async(req, res, next) => {
    try {
        const newTest = new Test({
            creator: req.body.creator,
            title: req.body.title,
            description: req.body.description,
            cards: []
        })

        let test = await newTest.save();
        test = await test.populate('creator')
        return res.json(test);
    }
    catch(err) {
        next(err);
    }
})

// POST (add card to a test)
router.post('/:testId/cards', requireUser, validateCardInput, async(req, res) => {
    try {
        const { testId } = req.params;
        const test = await Test.findById(testId);

        if (!test) {
            return res.status(404).json({ message: 'Test set not found.'})
        }

        const card = await Card.create(req.body);
        test.cards.push(card);
        await test.save();

        res.status(201).json(card);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// DELETE (remove card from a test)
router.delete('/:testId/cards/:cardId', requireUser, async(req, res) => {
    try {
        const { testId, cardId } = req.params;
        const test = await Test.findById(testId);

        if (!test) {
            return res.status(404).json({ message: 'Test set not found.' });
        }

        const cardIndex = test.cards.indexOf(cardId);
        if (cardIndex === -1) {
            return res.status(404).json({ message: 'Card not found in test set.'});
        }

        test.cards.splice(cardIndex, 1);
        await test.save();

        await Card.findByIdAndDelete(cardId);

        res.status(200).json({ message: 'Card removed from test set.' })
    }
    catch (error) {
        res.status(400).json({ error: error.message})
    }
})


// DELETE api/tests/:testId (remove test and all cards associated with it)
router.delete('/:testId', requireUser, async(req, res) => {
    try {
        const { testId } = req.params;
        const test = await Test.findById(testId);

        if (!test) {
            return res.status(404).json({ message: 'Test set not found.' });
        }

        await Card.deleteMany({ _id: { $in: test.cards }});
        await Test.findByIdAndDelete(testId);

        res.status(200).json({ message: 'Test and card sets deleted.' })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// PATCH api/tests/addCard (create new card in test collection)
router.patch('/:testId/')

module.exports = router;