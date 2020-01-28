const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const { getAllVacations } = require('../utils/queryHelpers');

router.get('/', async (req, res, next) => {
	const result = await pool.execute('select firstname from vacations.users');
	res.json({ msg: 'hello from follow route' });
});

router.post('/', async (req, res, next) => {
	const { vacationID, userID } = req.body;
	if (!vacationID || !userID) return res.json({ msg: 'user and vacation id not provided' });
	try {
		//check if record not exist in db
		const [
			ifExistFollower
		] = await pool.execute('select * from `vacations`.`followers` where user_id = ? and vacation_id = ?', [
			userID,
			vacationID
		]);
		const [ result ] = ifExistFollower;
		if (result) return res.json({ msg: 'record already exist' });
		// res.json({ msg: 'record not exist' });
		const resultQuery = await pool.execute(
			'INSERT INTO `vacations`.`followers` (`user_id`, `vacation_id`) VALUES (?,?)',
			[ userID, vacationID ]
		);
		//update all followers + 1
		const updateQuery = await pool.execute(
			'UPDATE `vacations`.`vacation` set all_followers = all_followers + 1 WHERE id = ?',
			[ vacationID ]
		);

		res.status(200).json({
			msg: 'success post',
			resuaffectedRows: resultQuery[0].affectedRows,
			updateQuery: updateQuery[0].affectedRows
		});
	} catch (ex) {
		res.json({ error: ex });
	}
});

//delete follower based on id an vacation
router.delete('/', async (req, res, next) => {
	const { vacationID, userID } = req.body;
	try {
		//update all_followers -1
		const updateQuery = await pool.execute(
			'UPDATE `vacations`.`vacation` set all_followers = all_followers - 1 WHERE id = ?',
			[ vacationID ]
		);
		const result = await pool.execute('DELETE FROM `vacations`.`followers` WHERE user_id = ? and vacation_id = ?', [
			userID,
			vacationID
		]);
		res.json({ msg: 'success', result, updateQuery: updateQuery[0].affectedRows });
	} catch (ex) {
		res.json({ error: ex });
	}
});

router.post('/switchChecker', async (req, res, next) => {
	const { userID, vacationID } = req.body;
	if (!userID) return res.json({ msg: 'no vacation or user id were provided' });
	const checker = await pool.execute(
		'select vacation.id from `vacations`.`vacation` join `vacations`.`followers` on followers.vacation_id = vacation.id join `vacations`.`users` on followers.user_id = users.id where vacation.id = ? and user_id = ?',
		[ vacationID, userID ]
	);
	// const checker = await pool.execute(
	// 	'select vacation.id from `vacations`.`vacation` join `vacations`.`followers` on followers.vacation_id = vacation.id join `vacations`.`users` on followers.user_id = users.id where user_id = ?',
	// 	[ userID ]
	// );
	const [ first ] = checker;

	// const checker = pool.execute('select * from vacations ');
	res.json(first);
});

module.exports = router;
