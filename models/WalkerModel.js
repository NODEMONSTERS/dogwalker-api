const mongoose = require('../db/connection');

const walkerSchema = new mongoose.Schema({
	name : String,
    email : String,
    password : String,
    picture : String,
    city: String
});

module.exports = mongoose.model('Walker', walkerSchema);
