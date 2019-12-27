const express = require('express');
const router = express.Router();

router.post('/register', async (req, res, next) => {
	const { firstname, lastname, username, password } = req.body;
	res.json({ msg: 'hello from register' });
});

router.post('/login', async (req, res, next) => {
	res.json({ msg: 'hello from login' });
});

module.exports = router;
