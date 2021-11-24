const express = require('express');
const router = express.Router();
const User = require('../models/OwnerModel');

const passport = require('passport');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) throw err;
		if (!user) res.send('No User Exists');
		else {
			req.logIn(user, (err) => {
				if (err) throw err;
				res.send('Success!');
				console.log(req.user);
			});
		}
	})(req, res, next);
});

// on registration
router.post('/register', async (req, res) => {
	const { name, email, password, city } = req.body;

	// check toi make sure email and password are entered
	if (!email || !password) {
		return res.status(400).json({ msg: 'Please enter required fields' });
	}

	//search for existing users by email
	const user = await User.findOne({email});

	// if a user is found, return error message
	if(user){
		return res.status(400).json({ msg: 'User Already Exists. Please Login' });
	}

	// salt the password to add extra security. if something goes wrong, send error
	const salt = await bcrypt.genSalt(10);
	if (!salt) {
		return res.status(400).json({ msg: "Something got salty"})
	} 

	// hash the password as well, so now sending the password out into the open world.
	//if something goes wrong, send and error
	const hash = await bcrypt.hash(password, salt)
	if (!hash ) throw Error ("Something didn't get hashed correctly")

	//create a new user
	const newUser = new User ({
		name,
		email,
		password: hash,
		city
	})

	//save the user, and if it does not save, send error
	const savedUser = await newUser.save();
	if (!savedUser) throw Error ("User was not saved")

	
	res.status(200).json(
		"user created"
		)

});
router.get('/user', async (req, res) => {
	const owners = await User.find({});
	res.status(200).json({ status: 200, owners: owners });
	res.send(req.user);
});

module.exports = router;
