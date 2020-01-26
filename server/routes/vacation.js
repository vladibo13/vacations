const express = require('express');
const pool = require('../db/pool');
const router = express.Router();
const { vacationValidation } = require('../validations/vacationValidation');
const {
	getAllVacations,
	getLikedVacations,
	addVacation,
	deleteVacation,
	updateVacation
} = require('../utils/queryHelpers');

router.get('/', async (req, res, next) => {
	try {
		const vacations = await getAllVacations();
		res.status(200).json({ msg: 'success ', vacations });
	} catch (e) {
		res.status(400).json([]);
	}
});
//get vacation filtred based on liked or regular
router.post('/filtred', async (req, res, next) => {
	const { userID } = req.body;
	try {
		const vacations = await getAllVacations();
		const likedVacations = await getLikedVacations(userID);
		const vFinal = vacations.map((v) => {
			const found = likedVacations.find((r) => r.id === v.id);
			if (found) return { ...v, isSelected: true };
			return { ...v, isSelected: false };
		});
		res.status(200).json({ msg: 'success', vacations: vFinal });
	} catch (e) {
		res.status(400).json({ msg: e });
	}
});
//add a vacation
router.post('/', vacationValidation, async (req, res, next) => {
	console.log('ADD VACATION ', req.body);
	const { description, destination, picture, from_date, to_date, all_followers, cost } = req.body;
	if (!destination || !description || !picture || !from_date || !to_date || !all_followers || !cost)
		return res.status(400).json({ msg: 'all fields are mandatory' });
	try {
		const result = await addVacation(description, destination, picture, from_date, to_date, all_followers, cost);
		res.status(200).json({ msg: 'success', id: result[0].affectedRows + ' created' });
	} catch (ex) {
		res.status(400).json({ msg: 'request failed at server = ' + ex });
	}
});
//delete vacation
router.delete('/', async (req, res, next) => {
	const { userID, vacationID } = req.body;
	console.log('HIT THE DELETE ', req.body);
	// if (!id) return res.status(400).json({ msg: 'no id were provided ' });

	// const validateLikedVacation = pool.execute('')

	try {
		const result = await deleteVacation(vacationID);
		res.status(200).json({ msg: 'success delete', id: result[0].affectedRows + ' deleted' });
	} catch (ex) {
		res.status(400).json({ msg: ex });
	}
});

router.put('/', async (req, res, next) => {
	const { description, destination, picture, from_date, to_date, cost, id } = req.body;
	console.log('HIT THE PUT REQUEST = ', req.body);
	try {
		// const result = await pool.execute(
		// 	'UPDATE `vacations`.`vacation` SET description = ?, destination = ?, picture = ?, from_date = ?, to_date = ?, cost = ? WHERE id = ?',
		// 	[ description, destination, picture, from_date, to_date, cost, id ]
		// );
		// const vacations = await getAllVacations();
		const result = await updateVacation(description, destination, picture, from_date, to_date, cost, id);
		res.status(200).json({ msg: 'success', result });
	} catch (ex) {
		res.status(400).json({ msg: 'error update from server = ' + ex });
	}
});

module.exports = router;
