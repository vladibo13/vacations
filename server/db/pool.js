const mysql2 = require('mysql2');
const { HOST, USER, DB_PORT, PASSWORD, DATABASE } = process.env;

const pool = mysql2.createPool({
	host: HOST,
	port: DB_PORT,
	user: USER,
	password: PASSWORD,
	database: DATABASE,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
});

module.exports = pool.promise();
