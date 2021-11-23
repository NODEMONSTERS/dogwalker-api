const express = require('express');
const router = express.Router();
const Dog = require('../models/DogModel');

router.post('/', async (req, res) => {
	const createDog = await Dog.create(req.body);
	res.status(201).json({ status: 201, owners: createDog });
});

//get
router.get('/', async (req, res) => {
	const dogs = await Dog.find({});
	res.status(200).json({ status: 200, data: dogs });
});

//update

router.put('/:id', async (req, res) => {
	const updatedDog = await Dog.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(200).json({ status: 200, data: updatedDog });
});

//delete
router.delete('/:id', async (req, res) => {
	const deleteDog = await Dog.findByIdAndDelete(req.params.id);
	const dogs = Dog.find({});
	res.status(204).json({ dogs: dogs });
});

module.exports = router;
