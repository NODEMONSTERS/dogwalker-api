const User = require('../models/OwnerModel');
const Walker = require('../models/WalkerModel');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
	passport.use('local-owner',
		new localStrategy((email, password, done) => {

				User.findOne({ email: email }, (err, user) => {
					if (err) throw err;
					if (!user) return done(null, false);
					bcrypt.compare(password, user.password, (err, result) => {
						if (err) return 'invalid password';
						if (result === true) {
							return done(null, user);
						} else {
							return done(null, false);
						}
					});
				});
	
				
			}
		)
	);

	passport.use(
		'local-walker',
		new localStrategy((email, password, done) => {
			User.findOne({ email: email }, (err, user) => {
				if (err) throw err;
				if (!user) return done(null, false);
				bcrypt.compare(password, user.password, (err, result) => {
					if (err) return 'invalid password';
					if (result === true) {
						return done(null, user);
					} else {
						return done(null, false);
					}
				});
			});
		})
	);


	passport.serializeUser((user, done) => {
		if (typeof User.userTpe === 'owner') {
			done(null, user.id);
		} else {
			done(null, user.id);
		}
	});
	passport.deserializeUser((id, done) => {
		if (typeof User.userTpe === 'owner') {
			User.findOne({ _id: id }, (err, user) => {
				const userInformation = {
					email: user.email,
				};
				done(err, userInformation);
			});
		} else {
			Walker.findOne({ _id: id }, (err, user) => {
				const userInformation = {
					email: user.email,
				};
				done(err, userInformation);
			});
		}
	});
};
