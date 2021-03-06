const express = require('express');
const router = express.Router();
const Owner = require('../models/OwnerModel');
const Dog = require('../models/DogModel');

const passport = require('passport');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

// CREATE OWNER
router.post('/', async (req, res) => {
	const createOwner = await Owner.create(req.body);
	res.status(201).json({ status: 201, owners: createOwner });
});

//GET ALL OWNERS
router.get('/', async (req, res) => {
	const owners = await Owner.find({});
	res.status(200).json({ status: 200, owners: owners });
});

//GET ONE OWNER
router.get('/:id', async (req, res) => {
	const owner = await Owner.findById({_id: req.params.id}).populate('dogs');
	res.status(200).json({ status: 200, owner: owner });
});

//UPDATE OWNER
router.put('/:id', async (req, res) => {
	const updatedOwner = await Owner.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
	res.status(200).json({ status: 200, data: updatedOwner });
});

//DELETE OWNER
router.delete('/:id', async (req, res) => {
	const deleteOwner = await Owner.findByIdAndDelete(req.params.id);
	const owners = Owner.find();
	res.status(204).json({ owners: owners });
});

// ADDING DOG TO OWNER'S ARRAY
router.put("/:id/addDog", async (req, res) => {
  const dog = await Dog.findById(req.body.id);
  const owner = await Owner.findByIdAndUpdate(req.params.id, {
    $push: { dogs: dog.id }},
    {new: true},
  ).populate('dogs');
  res.json({ status: 200, data: owner });
});

//user logs in
router.post('/login', (req, res, next) => {
	passport.authenticate('local-owner', (err, user, info) => {
		if (err) throw err;
		if (!user) res.status(400).json({ msg: 'Invalid credentials' });
		else {
			req.logIn(user, (err) => {
				if (err) throw err;
				res.json({user});
				console.log(req.user);
			});
		}
	})(req, res, next);
});

// user registers
router.post('/register', async (req, res) => {
	const { name, email, password, city } = req.body;

	// check toi make sure email and password are entered
	if (!email || !password) {
		return res.status(400).json({ msg: 'Please enter required fields' });
	}

	//search for existing users by email
	const user = await Owner.findOne({ email });

	// if a user is found, return error message
	if (user) {
		return res.status(400).json({ msg: 'User Already Exists. Please Login' });
	}

	// salt the password to add extra security. if something goes wrong, send error
	const salt = await bcrypt.genSalt(10);
	if (!salt) {
		return res.status(400).json({ msg: 'Something got salty' });
	}

	// hash the password as well, so now sending the password out into the open world.
	//if something goes wrong, send and error
	const hash = await bcrypt.hash(password, 10);
	if (!hash) throw Error("Something didn't get hashed correctly");

	//create a new user
	const newOwner = new Owner({
		name,
		email,
		password: hash,
		city,
	});

	//save the user, and if it does not save, send error
	const savedOwner = await newOwner.save();
	if (!savedOwner) throw Error('User was not saved');

	// res.status(200).json('user created');
	res.status(200).json({newOwner: savedOwner});
});

// user logs out
router.get('/logout', (req, res, next) => {
	//log user out
	req.logout();
	//redirect... can update where later
	res.redirect('/');
});

module.exports = router;
