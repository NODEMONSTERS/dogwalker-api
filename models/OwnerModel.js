const mongoose = require('../db/connection');

const ownerSchema = new mongoose.Schema({
	name : String,
    city: String,
    email: String,
    dogs: [{ ref: 'Dog', type: mongoose.Schema.Types.ObjectId }]
});

module.exports = mongoose.model('DogOwner', ownerSchema);