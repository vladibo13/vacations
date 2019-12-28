const {
	getUserExistQuery,
	getUserInsertionQuery,
	getUserPasswordExistQuery,
	gethashedPasswordQuery
} = require('./queries');
const pool = require('../db/pool');

async function saveUser(user) {
	console.log(user);
	const { email, password, firstname, lastname } = user;
	const query = getUserInsertionQuery();
	const payload = [ firstname, lastname, email, password ];
	const [ result ] = await pool.execute(query, payload);
	return result.insertId;
}

async function isUserExist(email, password = null) {
	const query = password ? getUserPasswordExistQuery() : getUserExistQuery();
	const payload = password ? [ email, password ] : [ email ];
	const [ result ] = await pool.execute(query, payload);
	const [ firstUser ] = result;
	console.log(firstUser);
	return firstUser;
}

async function getHashedPassword(email) {
	const query = gethashedPasswordQuery();
	const payload = [ email ];
	const [ result ] = await pool.execute(query, payload);
	const [ hashedPassword ] = result;
	return hashedPassword;
}

module.exports = { saveUser, isUserExist, getHashedPassword };
