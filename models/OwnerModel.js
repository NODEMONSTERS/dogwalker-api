const mongoose = require('../db/connection');

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
	dogs: [{ type: mongoose.Schema.ObjectId, ref: 'Dog' }],
});

module.exports = mongoose.model('DogOwner', ownerSchema);