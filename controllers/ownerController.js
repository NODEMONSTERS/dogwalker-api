const express = require('express');
const router = express.Router();
const Owner = require('../models/OwnerModel');

router.post('/', async (req, res) => {
	const createOwner = await Owner.create(req.body);
	res.status(201).json({ status: 201, owners: createOwner });
});

//get
router.get('/', async (req, res) => {
	const owners = await Owner.find({});
	res.status(200).json({ status: 200, owners: owners });
});

//update

router.put('/:id', async (req, res) => {
	const updatedOwner = Owner.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(200).json({ status: 200, data: updatedOwner });
});

//delete
router.delete('/:id', async (req, res) => {
	const deleteOwner = Owner.findByIdAndDelete(req.params.id);
	const owners = Owner.find();
	res.status(204).json({ owners: owners });
});

module.exports = router;
