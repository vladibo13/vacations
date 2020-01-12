const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

router.get('/', async (req, res, next) => {
	const result = await pool.execute('select firstname from vacations.users');
	res.json({ msg: 'hello from follow route' });
});

// select *
// from vacation
//  join  followers
// on followers.vacation_id = vacation.id
//  join users
// on followers.user_id = users.id
// where vacation.id = 11 and user_id = 1

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
