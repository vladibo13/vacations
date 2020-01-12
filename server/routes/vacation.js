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
	// try {
	// 	const result1 = await pool.execute(
	// 		'select vacation.id, vacation.destination, vacation.from_date, vacation.to_date, vacation.picture, vacation.description, vacation.all_followers, vacation.cost from `vacations`.`vacation` join `vacations`.`followers` on followers.vacation_id = vacation.id join `vacations`.`users` on followers.user_id = users.id where user_id = ?',
	// 		[ 1 ]
	// 	);
	// 	const result2 = await pool.execute(
	// 		'select vacation.id, vacation.destination, vacation.from_date, vacation.to_date, vacation.picture, vacation.description, vacation.all_followers, vacation.cost from `vacations`.`vacation` left join `vacations`.`followers` on followers.vacation_id = vacation.id left join `vacations`.`users` on followers.user_id = users.id where user_id is null'
	// 	);
	// 	const [ likedVacations ] = result1;
	// 	const [ regularVacatioins ] = result2;
	// 	const liked = likedVacations.map((l) => {
	// 		return { ...l, isSelected: true };
	// 	});
	// 	const regular = regularVacatioins.map((r) => {
	// 		return { ...r, isSelected: false };
	// 	});
	// 	const vacations = [ ...liked, ...regular ];
	// 	res.status(200).json({ msg: 'success ', vacations });
	// } catch (e) {
	// 	res.status(400).json([]);
	// }
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
	console.log('id from delete = ', id);
	if (!id) return res.status(400).json({ msg: 'no id were provided ' });
	const vacToDelete = await pool.execute('select * from `vacations`.`vacation` WHERE id = ?', [ id ]);
	const [ resultToDelete ] = vacToDelete;
	console.log('result to delete = ', resultToDelete.id);
	// if (resultToDelete.length > 0) {

	try {
		console.log(id);
		const result = await pool.execute('DELETE FROM `vacations`.`vacation` WHERE id = ?', [ id ]);
		console.log('resuklt delete', result);
		res.status(200).json({ msg: 'success delete', result });
	} catch (ex) {
		res.status(400).json({ msg: ex });
	}
	// } else {
	// 	res.status(400).json({ msg: 'bad request' });
	// }
	// console.log(req.body);
});

module.exports = router;
