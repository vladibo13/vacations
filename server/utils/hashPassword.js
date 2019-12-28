const bcrypt = require('bcryptjs');

async function hashPassword(plainText) {
	const salt = await bcrypt.genSalt(10);
	const hashed = await bcrypt.hash(plainText, salt);
	return hashed;
}

async function compareHashPassword(plainText, hash) {
	console.log(plainText);
	console.log(hash);
	const isMatch = await bcrypt.compare(plainText, hash);
	return isMatch;
}

module.exports = { hashPassword, compareHashPassword };
