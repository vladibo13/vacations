function getUserExistQuery() {
	return 'SELECT * FROM `vacations`.`users` WHERE email = ?';
}
function getUserByIDQuery() {
	return 'SELECT * FROM `vacations`.`followers` WHERE user_id = ? AND vacation_id = ?';
}
function getUserInsertionQuery() {
	return 'INSERT INTO `vacations`.`users` (`firstname`, `lastname`, `email`, `password`) VALUES (?,?,?,?)';
}
function getUserPasswordExistQuery() {
	return 'SELECT * FROM `vacations`.`users` WHERE email = ? and password = ?';
}
function gethashedPasswordQuery() {
	return 'SELECT password FROM `vacations`.`users` WHERE email = ? ';
}
function getUserChartsQuery() {
	return 'SELECT destination,all_followers FROM `vacations`.`vacation`';
}
function getAllVacationsQuery() {
	return 'select * from vacations.vacation';
}
function getLikedVacationsQuery() {
	return 'select vacation.id, vacation.destination, vacation.from_date, vacation.to_date, vacation.picture, vacation.description, vacation.all_followers, vacation.cost from `vacations`.`vacation` join `vacations`.`followers` on followers.vacation_id = vacation.id join `vacations`.`users` on followers.user_id = users.id where user_id = ?';
}
function addVacationQuery() {
	return 'INSERT INTO `vacations`.`vacation`(description, destination, picture,from_date, to_date,cost, all_followers) VALUES (?, ?, ?, ?, ?, ?, ?)';
}
function deleteVacationQuery() {
	return 'DELETE FROM `vacations`.`vacation` WHERE id = ?';
}
function updateVacationQuery() {
	return 'UPDATE `vacations`.`vacation` SET description = ?, destination = ?, picture = ?, from_date = ?, to_date = ?, cost = ? WHERE id = ?';
}
function getVacationByIDQuery() {
	return 'SELECT * FROM `vacations`.`followers` WHERE vacation_id = ?';
}
function deleteVacationFromFollowersByIDQuery(id) {
	return 'DELETE FROM `vacations`.`followers` WHERE vacation_id = ?';
}
function createFollowerQuery() {
	return 'INSERT INTO `vacations`.`followers` (`user_id`, `vacation_id`) VALUES (?,?)';
}
function addToFollowCountQuery() {
	return 'UPDATE `vacations`.`vacation` set all_followers = all_followers + 1 WHERE id = ?';
}
function removeFromFollowCountQuery() {
	return 'UPDATE `vacations`.`vacation` set all_followers = all_followers - 1 WHERE id = ?';
}
function removeFollowerByIDQuery() {
	return 'DELETE FROM `vacations`.`followers` WHERE user_id = ? and vacation_id = ?';
}
module.exports = {
	getUserExistQuery,
	getUserInsertionQuery,
	getUserPasswordExistQuery,
	gethashedPasswordQuery,
	getUserChartsQuery,
	getAllVacationsQuery,
	getLikedVacationsQuery,
	getUserByIDQuery,
	addVacationQuery,
	deleteVacationQuery,
	updateVacationQuery,
	getVacationByIDQuery,
	deleteVacationFromFollowersByIDQuery,
	createFollowerQuery,
	addToFollowCountQuery,
	removeFromFollowCountQuery,
	removeFollowerByIDQuery
};
