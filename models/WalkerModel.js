const mongoose = require('../db/connection');
const requestSchema = require('./requestSchema')

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
	requests: [requestSchema]
});

module.exports = mongoose.model('Walker', walkerSchema);
