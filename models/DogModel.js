const mongoose = require('../db/connection');

const dogSchema = new mongoose.Schema({
	name: { type: String, required: true },
	breed: String,
	age: Number,
	picture: String,
	personality: String,
	walkLengths: String,
});

module.exports = mongoose.model('Dog', dogSchema);
