function getUserExistQuery() {
	return 'SELECT * FROM `vacations`.`users` WHERE email = ?';
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
	return 'UPDATE `vacations`.`vacation` SET destination = ?, from_date = ?, to_date = ?, picture = ?, description = ?, cost = ? WHERE id = ?';
}
module.exports = {
	getUserExistQuery,
	getUserInsertionQuery,
	getUserPasswordExistQuery,
	gethashedPasswordQuery,
	getUserChartsQuery,
	getAllVacationsQuery,
	getLikedVacationsQuery,
	addVacationQuery,
	deleteVacationQuery
};
