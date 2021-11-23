// CONNECT TO MONGO DB IN YOUR LOCAL DATABASE
const mongoose = require('mongoose');
mongoose.connect(
	'mongodb+srv://lyshia:mongomongo@cluster0.i7xdk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
	{ useNewUrlParser: true },
	{ useUnifiedTopology: true },
	() => {
		console.log('MongoDB Connected');
	}
);

module.exports = mongoose;
