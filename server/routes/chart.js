const express = require('express');
const pool = require('../db/pool');
const router = express.Router();

router.get('/', async (req, res, next) => {
	const charts = await pool.execute('select destination,all_followers from `vacations`.`vacation`');
	const [ result ] = charts;
	const destinations = result.map((dest) => dest.destination);
	const followers = result.map((foll) => foll.all_followers);
	res.json({ msg: 'hello from chart', destinations, followers });
});

module.exports = router;
