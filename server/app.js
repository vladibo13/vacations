const express = require('express');
const app = express();
require('dotenv').config();
const pool = require('./db/pool');
const authRoutes = require('./routes/auth');
const vactionRoutes = require('./routes/vacation');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
// const logger = require('./utils/logger');
app.use(bodyParser.json());

app.get('/', async (req, res, next) => {
	const result = await pool.execute('select * from northwind.customers');
	const [ first ] = result;
	res.json(first);
});

app.use('/vacation', vactionRoutes);
app.use('/auth', authRoutes);

app.listen(process.env.PORT, () => {
	console.log(`server running on port ${process.env.PORT}...`);
	// logger.info(`server is listening to port: ${process.env.PORT}`);
});
