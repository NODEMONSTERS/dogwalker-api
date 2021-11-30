const express = require('express');
const router = express.Router();
const Walker = require('../models/WalkerModel');

const passport = require('passport');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

// GET ROUTE - get all dog walkers
router.get('/', async (req, res) => {
	const allWalkers = await Walker.find();
	res.status(200).json({ status: 200, allWalkers: allWalkers });
});
// GET 1 WALKER
router.get('/:id', async (req, res) => {
	const walker = await Walker.find({_id: req.params.id})
	res.status(200).json({ status: 200, walker: walker})
})

// POST ROUTE - add new dog walker
router.post('/', async (req, res) => {
	const newWalker = await Walker.create(req.body);
	res.status(201).json({ status: 201, newWalker: newWalker });
});

// DELETE ROUTE - delete dog walker by id
router.delete('/:id', async (req, res) => {
	await Walker.findByIdAndDelete(req.params.id);
	const allWalkers = await Walker.find();
	res.status(200).json({ status: 200, allWalkers: allWalkers });
});

// UPDATE ROUTE - update dog walker
router.put('/:id', async (req, res) => {
	const updatedWalker = Walker.findByIdAndUpdate(req.body.id, req.body, {
		new: true,
	});
	res.status(200).json({ status: 200, data: updatedWalker });
});

// ADD REQUEST - owner creates a request for dog walker
router.post('/:id/addRequest', async (req, res) => {
	const findWalker = await Walker.findByIdAndUpdate({_id : req.params.id}, {$push: {requests: req.body}}, {new:true})
	res.status(201).json({status: 201, updatedWalker: findWalker})
})

//user logs in
router.post('/login', (req, res, next) => {
	passport.authenticate('local-walker', (err, user, info) => {
		if (err) throw err;
		if (!user) res.status(400).json({ msg: 'Invalid credentials' });
		else {
			req.logIn(user, (err) => {
				if (err) throw err;
				res.json({ user });
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
	const user = await Walker.findOne({ email });

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
	const hash = await bcrypt.hash(password, salt);
	if (!hash) 	return res.status(400).json({ msg: 'Something did not hash correctly' });

	//create a new user
	const newWalker = new Walker({
		name,
		email,
		password: hash,
		city,
	});

	//save the user, and if it does not save, send error
	const savedWalker = await newWalker.save();
	if (!savedWalker) throw Error('User was not saved');

	res.status(200).json('user created');
});

// user logs out
router.get('/logout', (req, res, next) => {
	//log user out
	req.logout();
	//redirect... can update where later
	res.redirect('/');
});

module.exports = router;
