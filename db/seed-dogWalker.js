// IMPORT SEED DATA FROM .JSON FILE
const seedDogWalker = require('../seed-dogWalker.json');
// IMPORT WALKER SCHEMA/BLUEPRINT
const DogWalkerSchema = require('../models/WalkerModel');

// THIS WILL DELETE EVERYTHING IN DATABASE PRODUCED VIA WALKER SCHEMA, THEN REPOPULATE DATABASE VIA WALKER SCHEMA WITH ORIGINAL SEED DATA.
DogWalkerSchema.deleteMany({}).then(() => {
	DogWalkerSchema.insertMany(seedDogWalker, (err) => {
		if (err) {
			console.log(err);
		} else {
			DogWalkerSchema.find({});
			console.log('Dog Walkers Seeded!');
		}
		process.exit();
	});
});
