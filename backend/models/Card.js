const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = Schema({
    term: {
        type: String,
        required: true
    },
    definition: {
        type: String,
        required: true
    },
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
    }
})

module.exports = mongoose.model('Card', cardSchema);