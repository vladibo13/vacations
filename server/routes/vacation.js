const express = require('express');
const pool = require('../db/pool');
const router = express.Router();
const { vacationValidation } = require('../validations/vacationValidation');

// router.use('/', vacationValidation);
router.get('/', async (req, res, next) => {
	try {
		const result = await pool.execute('select * from vacations.vacation');
		const [ vacations ] = result;
		// const vacations = temp.map(async (v) => {
		// 	const checker = await pool.execute(
		// 		'select vacation.id from `vacations`.`vacation` join `vacations`.`followers` on followers.vacation_id = vacation.id join `vacations`.`users` on followers.user_id = users.id where vacation.id = ? and user_id = ?',
		// 		[ v.id, 2 ]
		// 	);
		// 	const [ first ] = checker;
		// 	let isSelected;
		// 	first.length ? (isSelected = true) : (isSelected = false);

		// 	return { ...v, isSelected };
		// });
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
	// 	const vacations = [ ...likedVacations, ...regularVacatioins ];
	// 	res.status(200).json({ msg: 'success ', vacations });
	// } catch (e) {
	// 	res.status(400).json([]);
	// }
});
//get vacation filtred based on liked or regular
router.post('/filtred', async (req, res, next) => {
	console.log('server filtred = ');
	const { userID } = req.body;
	try {
		const result1 = await pool.execute(
			'select vacation.id, vacation.destination, vacation.from_date, vacation.to_date, vacation.picture, vacation.description, vacation.all_followers, vacation.cost from `vacations`.`vacation` join `vacations`.`followers` on followers.vacation_id = vacation.id join `vacations`.`users` on followers.user_id = users.id where user_id = ?',
			[ userID ]
		);
		// res.status(200).json({ msg: 'success ', result1 });
		const result2 = await pool.execute(
			'select vacation.id, vacation.destination, vacation.from_date, vacation.to_date, vacation.picture, vacation.description, vacation.all_followers, vacation.cost from `vacations`.`vacation` join `vacations`.`followers` on followers.vacation_id = vacation.id join `vacations`.`users` on followers.user_id = users.id where user_id != ?',
			[ userID ]
		);
		// console.log(likedVacations);
		// console.log(regularVacatioins);
		const [ likedVacations ] = result1;
		const [ regularVacatioins ] = result2;
		// let temp = state.vacations.map((v: any) => {

		// 	({ ...v, isSelected: false })});
		const temp1 = likedVacations.map((l) => ({ ...l, isSelected: true }));
		const temp2 = regularVacatioins.map((l) => ({ ...l, isSelected: false }));
		const vacations = [ ...temp1, ...temp2 ];
		res.json({ vacations });
	} catch (e) {
		res.status(400).json({ msg: e });
	}
});
//get liked vacations based on user id
//get all regular vacations, based on user id
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

router.put('/', async (req, res, next) => {
	const { userID } = req.body;
	const result = await pool.execute('UPDATE `vacations`.`vacation` SET all_followers');
});

module.exports = router;
