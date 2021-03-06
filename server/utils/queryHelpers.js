const {
	getUserExistQuery,
	getUserInsertionQuery,
	getUserPasswordExistQuery,
	gethashedPasswordQuery,
	getUserChartsQuery,
	getAllVacationsQuery,
	getLikedVacationsQuery,
	addVacationQuery,
	deleteVacationQuery,
	updateVacationQuery,
	getVacationByID,
	deleteVacationFromFollowersByIDQuery,
	getVacationByIDQuery,
	getUserByIDQuery,
	createFollowerQuery,
	addToFollowCountQuery,
	removeFromFollowCountQuery,
	removeFollowerByIDQuery
} = require('./queries');
const pool = require('../db/pool');

async function saveUser(user) {
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
	return firstUser;
}

async function getHashedPassword(email) {
	const query = gethashedPasswordQuery();
	const payload = [ email ];
	const [ result ] = await pool.execute(query, payload);
	const [ hashedPassword ] = result;
	return hashedPassword;
}

async function getUserCharts() {
	const query = getUserChartsQuery();
	const [ result ] = await pool.execute(query);
	return result;
}

async function getAllVacations() {
	const query = getAllVacationsQuery();
	const result = await pool.execute(query);
	const [ vacations ] = result;
	return vacations;
}

async function getLikedVacations(id) {
	const query = getLikedVacationsQuery();
	const payload = [ id ];
	const result = await pool.execute(query, payload);
	const [ likedVacations ] = result;
	return likedVacations;
}

async function addVacation(description, destination, picture, from_date, to_date, all_followers, cost) {
	const query = addVacationQuery();
	const payload = [ description, destination, picture, from_date, to_date, all_followers, cost ];
	const result = await pool.execute(query, payload);
	return result;
}
async function deleteVacation(id) {
	const query = deleteVacationQuery();
	const payload = [ id ];
	const result = await pool.execute(query, payload);
	return result;
}
async function updateVacation(description, destination, picture, from_date, to_date, cost, id) {
	const query = updateVacationQuery();
	const payload = [ description, destination, picture, from_date, to_date, cost, id ];
	const result = await pool.execute(query, payload);
	return result;
}
async function getVacationFromFollowersByID(id) {
	const query = getVacationByIDQuery();
	const payload = [ id ];
	const result = await pool.execute(query, payload);
	const [ first ] = result;
	return first;
}

async function deleteVacationFromFollowersByID(id) {
	const query = deleteVacationFromFollowersByIDQuery();
	const payload = [ id ];
	const result = await pool.execute(query, payload);
	return result;
}

async function getFollowExist(userID, vacationID) {
	const query = getUserByIDQuery();
	const payload = [ userID, vacationID ];
	const [ ifExistFollower ] = await pool.execute(query, payload);
	const [ result ] = ifExistFollower;
	return result;
}
async function createFollowVacation(userID, vacationID) {
	const query = createFollowerQuery();
	const payload = [ userID, vacationID ];
	const createFollow = await pool.execute(query, payload);
	return createFollow;
}
async function addToFollowCount(vacationID) {
	const query = addToFollowCountQuery();
	const payload = [ vacationID ];
	const addToFollow = await pool.execute(query, payload);
	return addToFollow;
}
async function removeFromFollowCount(vacationID) {
	const query = removeFromFollowCountQuery();
	const payload = [ vacationID ];
	const removeFromFollow = await pool.execute(query, payload);
	return removeFromFollow;
}
async function removeFollowerByID(userID, vacationID) {
	const query = removeFollowerByIDQuery();
	const payload = [ userID, vacationID ];
	const removeFollowerByID = await pool.execute(query, payload);
	return removeFollowerByID;
}
module.exports = {
	saveUser,
	isUserExist,
	getHashedPassword,
	getUserCharts,
	getAllVacations,
	getLikedVacations,
	addVacation,
	deleteVacation,
	updateVacation,
	getVacationFromFollowersByID,
	deleteVacationFromFollowersByID,
	getFollowExist,
	createFollowVacation,
	addToFollowCount,
	removeFromFollowCount,
	removeFollowerByID
};
