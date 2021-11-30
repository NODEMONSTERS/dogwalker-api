const mongoose = require('../db/connection');

const dogSchema = new mongoose.Schema({
	name: { type: String, required: true },
	breed: String,
	age: Number,
	picture: { type: String, default: "https://pbs.twimg.com/profile_images/664507759484866560/jrJSVOfY_400x400.jpg" },
	personality: String,
	walkLengths: String,
});

module.exports = mongoose.model('Dog', dogSchema);
