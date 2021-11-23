const mongoose = require('../db/connection');
const dogSchema = require('./DogModel');
const ownerSchema = new mongoose.Schema({
	name: String,
	city: String,
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	dogs: [{ type: mongoose.Schema.ObjectId, ref: 'dogSchema' }],
});

module.exports = mongoose.model('DogOwner', ownerSchema);
