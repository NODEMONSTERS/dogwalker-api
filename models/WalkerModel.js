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
	picture: {
		type: String,
		default:
			'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
	},
	city: String,
});

module.exports = mongoose.model('Walker', walkerSchema);
