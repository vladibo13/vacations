const express = require('express');
const app = express();
require('dotenv').config();
const pool = require('./db/pool');

app.get('/', async (req, res, next) => {
	const result = await pool.execute('select * from northwind.orders');
	const [ first ] = result;
	res.json(first);
});

app.listen(process.env.PORT, () => {
	console.log(`server running on port ${process.env.PORT}...`);
});
