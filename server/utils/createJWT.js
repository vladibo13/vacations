const jwt = require('jsonwebtoken');

function getJwt(p) {
	return new Promise((resolve, reject) => {
		jwt.sign(p, process.env.SECRET, (err, token) => {
			if (err) reject('error');
			resolve(token);
		});
	});
}

module.exports = { getJwt };
