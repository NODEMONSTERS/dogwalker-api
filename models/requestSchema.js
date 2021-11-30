const mongoose = require('../db/connection')

const requestSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: true
    },
    ownerEmail: {
        type: String,
        required: true
    },
    dogs: {
        type: Array,
        required: true
    }
})

module.exports = requestSchema