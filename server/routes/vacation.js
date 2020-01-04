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
//add a vacation
router.post('/', async (req, res, next) => {
	const { destination, description, picture, from_date, to_date, all_followers, cost } = req.body;
	if (!destination || !description || !picture || !from_date || !to_date || !all_followers || !cost)
		return res.status(400).json({ msg: 'all fields are mandatory' });
	console.log(destination, description, picture, from_date, to_date, all_followers, cost);
	try {
		const result = await pool.execute(
			'INSERT INTO `vacations`.`vacation`(description, destination, picture,from_date, to_date,cost, all_followers) values (?, ?, ?, ?, ?, ?, ?)',
			[ destination, description, picture, from_date, to_date, all_followers, cost ]
		);
		res.status(200).json({ msg: 'success', id: result.insertId });
	} catch (ex) {
		res.status(400).json({ msg: ex });
	}
});

router.delete('/', async (req, res, next) => {
	const { id } = req.body;
	if (!id) return res.status(400).json({ msg: 'no id were provided ' });
	const vacToDelete = await pool.execute('select * from `vacations`.`vacation` WHERE id = ?', [ id ]);
	const [ resultToDelete ] = vacToDelete;
	if (resultToDelete.length > 0) {
		try {
			const result = await pool.execute('DELETE FROM `vacations`.`vacation` WHERE id = ?', [ id ]);
			res.status(200).json({ msg: 'success', result });
		} catch (ex) {
			res.status(400).json({ msg: ex });
		}
	} else {
		res.status(400).json({ msg: 'bad request' });
	}
	// console.log(req.body);
});

module.exports = router;
