require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const app = express();



PORT = process.env.PORT;

app.use(cors({
		credentials: true
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('combined'));

app.use(
	session({
		secret: 'secretcode',
		resave: true,
		saveUninitialized: true,
	})
);

app.use(cookieParser('secretcode'));
app.use(passport.initialize());
app.use(passport.session());
require('./db/ownerPassportConfiguration')(passport);

app.get('/', (req, res) => {
	res.send('Home page');
});

const dogController = require('./controllers/dogController');
app.use('/dog', dogController);

const ownerController = require('./controllers/ownerController');
app.use('/owner', ownerController);


const walkerController = require('./controllers/walkerController');
app.use('/walker', walkerController);

const ownerAuthenticationController = require('./controllers/ownerAuthenticationController')
app.use('/ownerAccount', ownerAuthenticationController)

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
	console.log(`✅ PORT: ${app.get('port')} 🌟`);
});
