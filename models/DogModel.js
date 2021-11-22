const mongoose = require('../db/connection');

const dogSchema = new mongoose.Schema({
	name: String,
	breed: String,
	age: Number,
	picture: String,
	personality: String,
	walkLengths: String,
});

module.exports = dogSchema;
