const express = require('express');
const router = express.Router();
const Dog = require('../models/DogModel');
const Owner = require('../models/OwnerModel');

// ADD DOG ROUTE
router.post('/', async (req, res) => {
	const createDog = await Dog.create(req.body)
	res.status(201).json({ status: 201, newDog: createDog });
});

// GET ALL DOGS ROUTE
router.get('/', async (req, res) => {
	const dogs = await Dog.find({});
res.status(200).json({ status: 200, data: dogs });
});

// UPDATE DOG
router.put('/:id', async (req, res) => {
	const updatedDog = await Dog.findByIdAndUpdate(req.params.id, req.body.dog, {
		new: true,
	});
	const owner = await Owner.findById({_id: req.body.ownerId}).populate('dogs');
	res.status(200).json({ status: 200, owner: owner });
});

// DELETE DOG
router.delete('/:id', async (req, res) => {
	const deleteDog = await Dog.findByIdAndDelete({_id: req.params.id});
	const owner = await Owner.findById({_id: req.body.id}).populate('dogs');
	res.status(200).json({ status: 200, owner: owner });
});

module.exports = router;
