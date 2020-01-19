const express = require('express');
const pool = require('../db/pool');
const router = express.Router();
const { getUserCharts } = require('../utils/queryHelpers');

router.get('/', async (req, res, next) => {
	// const charts = await pool.execute('select destination,all_followers from `vacations`.`vacation`');
	// const [ result ] = charts;
	try {
		const result = await getUserCharts();
		const destinations = result.map((dest) => dest.destination);
		const followers = result.map((foll) => foll.all_followers);
		res.json({ msg: 'success', destinations, followers });
	} catch (ex) {
		res.json(400).json({ msg: 'bad request' + ex });
	}
});

module.exports = router;
