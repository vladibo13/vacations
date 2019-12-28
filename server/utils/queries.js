function getUserExistQuery() {
	return 'SELECT * FROM `vacations`.`users` where email = ?';
}

function getUserInsertionQuery() {
	return 'INSERT INTO `vacations`.`users` (`firstname`, `lastname`, `email`, `password`) VALUES (?,?,?,?)';
}
function getUserPasswordExistQuery() {
	return 'SELECT * FROM `vacations`.`users` where email = ? and password = ?';
}
function gethashedPasswordQuery() {
	return 'SELECT password FROM `vacations`.`users` where email = ? ';
}
module.exports = { getUserExistQuery, getUserInsertionQuery, getUserPasswordExistQuery, gethashedPasswordQuery };
