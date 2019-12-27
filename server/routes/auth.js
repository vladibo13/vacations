const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const { saveUser, isUserExist } = require('../utils/queryHelpers');
const { registerValidation } = require('../validations/userValidation');

router.use('/register', registerValidation);
router.post('/register', async (req, res, next) => {
	const { firstname, lastname, email, password } = req.body;
	if (!firstname || !lastname || !email || !password) return res.json({ msg: 'all fields are mandatory' });
	try {
		const user = await isUserExist(email);
		if (user) return res.json({ msg: 'user already exist' });
		const insertId = await saveUser(req.body);
		if (insertId) return res.json({ msg: 'user saved!' });
	} catch (e) {
		return res.json({ msg: 'error!' });
	}
});

router.post('/login', async (req, res, next) => {
	res.json({ msg: 'hello from login' });
});

// async function isUserExist(email, password = null) {
// 	const payload = password ? [ email, bcrypt.hashSync(password, salt) ] : [ email ];
// 	// const payload = password ? [email, password] : [email]

// 	const query = password ? getUserPasswordExistQuery() : getUserExistQuery();
// 	const [ result ] = await pool.execute(query, payload);
// 	const [ firstUser ] = result;
// 	return firstUser;
// }
// async function isUserExist(email) {
// 	const query = getUserExistQuery();
// 	const payload = [ email ];

// 	const [ result ] = await pool.execute(query, payload);
// 	const [ firstUser ] = result;
// 	return firstUser;
// }
// function getUserExistQuery() {
// 	return 'SELECT * FROM `vacations`.`users` where email = ?';
// }
// function getUserPasswordExistQuery() {
// 	return 'SELECT * FROM `northwind`.`users` where email = ? and password = ?';
// }

// async function saveUser(user) {
// 	const { email, password, firstname, lastname } = user;
// 	const query = getUserInsertionQuery();
// 	const payload = [ email, password, firstname, lastname ];
// 	const [ result ] = await pool.execute(query, payload);
// 	return result.insertId;
// }

// function getUserInsertionQuery() {
// 	return 'INSERT INTO `vacations`.`users` (`firstname`, `lastname`, `email`, `password`) VALUES (?,?,?,?)';
// }

module.exports = router;
