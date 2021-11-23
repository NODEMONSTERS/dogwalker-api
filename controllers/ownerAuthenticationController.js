const express = require('express');
const router = express.Router();
const User = require('../models/OwnerModel');

const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
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

router.post('/register', (req, res) => {
	User.findOne({ username: req.body.email }, async (err, doc) => {
		if (err) throw err;
		if (doc) res.send('User Already Exists');
		if (!doc) {
			const hashedPassword = await bcrypt.hash(req.body.password, 10);

			const newUser = new User({
				name: req.body.name,
				username: req.body.email,
				password: hashedPassword,
			});
			await newUser.save();
			res.send('User Created');
		}
	});
});
router.get('/user', (req, res) => {
	const owners = await User.find({});
	res.status(200).json({ status: 200, owners: owners });
	res.send(req.user); 
});

module.exports = router;
