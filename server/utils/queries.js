function getUserExistQuery() {
	return 'SELECT * FROM `vacations`.`users` where email = ?';
}

function getUserInsertionQuery() {
	return 'INSERT INTO `vacations`.`users` (`firstname`, `lastname`, `email`, `password`) VALUES (?,?,?,?)';
}

module.exports = { getUserExistQuery, getUserInsertionQuery };
