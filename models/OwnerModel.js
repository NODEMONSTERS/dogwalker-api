const mongoose = require('../db/connection');
const dogSchema = require('./DogModel')

const ownerSchema = new mongoose.Schema({
	name : String,
    email: String,
    password : String,
    city: String,
    dogs: [dogSchema]
});

module.exports = mongoose.model('DogOwner', ownerSchema);