const express = require('express');
const router = express.Router();
const Walker = require('../models/WalkerModel');

// GET ROUTE - get all dog walkers
router.get('/', async (req, res) => {
  const allWalkers = await Walkers.find();
  res.status(200).json({ status: 200, allWalkers: allWalkers });
});

// POST ROUTE - add new dog walker
router.post('/', async (req, res) => {
  const newWalker = await Walker.create(req.body);
  res.status(201).json({ status: 201, newWalker: newWalker });
});

// DELETE ROUTE - delete dog walker by id
router.delete('/:id', async (req, res) => {
  await Walker.findByIdAndDelete(req.params.id);
  const allWalkers = await Walkers.find();
  res.status(200).json({ status: 200, allWalkers: allWalkers });  
});

// UPDATE ROUTE - update dog walker
router.put('/:id', async (req, res) => {
  const updatedWalker = Walker.findByIdAndUpdate(req.body.id, req.body, {new: true});
  res.status(200).json({ status: 200, data: updatedWalker });
});

module.exports = router;
