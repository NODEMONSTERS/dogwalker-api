const express = require('express');
const router = express.Router();
const Dog = require('../models/DogModel');

router.post('/', (req, res) => {
	Dog.create(req.body)
		.then((dog) => res.status(201).json({ status: 201, data: dog }))
		.catch((e) => console.log(e));
});

//get
router.get('/', (req, res) => {
	Dog.find().then((dog) => res.status(200).json({ status: 200, data: dog }));
});

//update

router.put('/:id', (req, res) => {
	Dog.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((dog) =>
		res.status(200).json({ status: 200, data: dog })
	);
});

//delete
router.delete('/:id', (req, res) => {
	Dog.findByIdAndDelete(req.params.id).then(() =>
		Dog.find().then((dog) => res.json({ data: dog }))
	);
});

module.exports = router;
