const mongoose = require('../db/connection');
const dogSchema = require('./DogModel')

const ownerSchema = new mongoose.Schema({
	name : String,
    city: String,
    dogs: [dogSchema]
});

module.exports = mongoose.model('DogOwner', ownerSchema);