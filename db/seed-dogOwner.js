// IMPORT SEED DATA FROM .JSON FILE
const seedDogOwner = require('../seed-dogOwner.json');
// IMPORT GIF SCHEMA/BLUEPRINT
const DogOwnerSchema = require('../models/OwnerModel');

// THIS WILL DELETE EVERYTHING IN DATABASE PRODUCED VIA GIF SCHEMA, THEN REPOPULATE DATABASE VIA GIF SCHEMA WITH ORIGINAL SEED DATA.
DogOwnerSchema.deleteMany({}).then(() => {
	DogOwnerSchema.insertMany(seedDogOwner, (err) => {
		if (err) {
			console.log(err);
		} else {
			DogOwnerSchema.find({});
			console.log('Dog Owners Seeded!');
		}
		process.exit();
	});
});
