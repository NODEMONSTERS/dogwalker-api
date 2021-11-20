require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

PORT = process.env.PORT;

app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(morgan('combined'));

app.get('/', (req, res) => {
	res.send('Home page');
});

const dogController = require('./controllers/dogController');
app.use('/dog', dogController);


app.listen(PORT, () => {
	console.log('listening...');
});
