const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    onlyMe: {
        type: Boolean,
        required: true,
        default: false
    },
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }]
})

module.exports = mongoose.model('Test', testSchema);