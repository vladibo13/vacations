const { getUserExistQuery, getUserInsertionQuery } = require('./queries');
const pool = require('../db/pool');

async function saveUser(user) {
	const { email, password, firstname, lastname } = user;
	const query = getUserInsertionQuery();
	const payload = [ email, password, firstname, lastname ];
	const [ result ] = await pool.execute(query, payload);
	return result.insertId;
}

async function isUserExist(email) {
	const query = getUserExistQuery();
	const payload = [ email ];
	const [ result ] = await pool.execute(query, payload);
	const [ firstUser ] = result;
	return firstUser;
}

module.exports = { saveUser, isUserExist };
