require('dotenv').config();

const express = require('express');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const vactionRoutes = require('./routes/vacation');
const chartRoutes = require('./routes/chart');
const followRoutes = require('./routes/follow');

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/vacations', vactionRoutes);
app.use('/chart', chartRoutes);
app.use('/follow', followRoutes);

app.listen(process.env.PORT, () => {
	console.log(`REST API on http://localhost:${process.env.PORT}`);
});
