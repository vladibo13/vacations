const express = require('express');
const pool = require('../db/pool');
const router = express.Router();
const { vacationValidation } = require('../validations/vacationValidation');

// router.use('/', vacationValidation);
router.get('/', async (req, res, next) => {
	// const { description, destination, picture, date, cost, followers } = req.body;
	// if (!description || !destination || !picture || !date || !cost || !followers)
	// 	return res.status(400).json({ msg: 'fileds cannot be empty' });
	try {
		const result = await pool.execute('select * from vacations.vacation');
		const [ vacations ] = result;
		res.status(200).json({ msg: 'success ', vacations });
	} catch (e) {
		res.status(400).json([]);
	}
});

module.exports = router;
