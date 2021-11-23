// CONNECT TO MONGO DB IN YOUR LOCAL DATABASE
const mongoose = require('mongoose');
mongoose.connect(
	'mongodb://localhost/dogApp',
	{ useNewUrlParser: true },
	() => {
		console.log('MongoDB Connected as Local Database');
	}
);

module.exports = mongoose;
