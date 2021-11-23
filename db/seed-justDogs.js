// IMPORT SEED DATA FROM .JSON FILE
const seedJustDogs = require('../seed-justDogs.json');
// IMPORT GIF SCHEMA/BLUEPRINT
const JustDogsSchema = require('../models/DogModel');

// THIS WILL DELETE EVERYTHING IN DATABASE PRODUCED VIA GIF SCHEMA, THEN REPOPULATE DATABASE VIA GIF SCHEMA WITH ORIGINAL SEED DATA.
JustDogsSchema.deleteMany({}).then(() => {
	JustDogsSchema.insertMany(seedJustDogs, (err) => {
		if (err) {
			console.log(err);
		} else {
			JustDogsSchema.find({});
			console.log('Just Dogs have been Seeded!');
		}
		process.exit();
	});
});
