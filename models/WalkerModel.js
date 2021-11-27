const mongoose = require('../db/connection');

const walkerSchema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	picture: String,
	city: String,
});

module.exports = mongoose.model('Walker', walkerSchema);
