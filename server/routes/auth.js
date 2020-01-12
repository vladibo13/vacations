const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { saveUser, isUserExist, getHashedPassword } = require('../utils/queryHelpers');
const { registerValidation, loginValidation } = require('../validations/userValidation');
const { hashPassword, compareHashPassword } = require('../utils/hashPassword');
const { getJwt } = require('../utils/createJWT');

// router.use('/register', registerValidation);
router.post('/register', registerValidation, async (req, res, next) => {
	console.log(req.body);
	const { firstname, lastname, email, password } = req.body;
	if (!firstname || !lastname || !email || !password)
		return res.status(400).json({ msg: 'all fields are mandatory' });
	try {
		//check if user exist
		const user = await isUserExist(email);
		if (user) return res.json({ msg: 'user already exist' });
		//hash the password
		const hashedPassword = await hashPassword(password);
		//save to db
		const insertId = await saveUser({ ...req.body, password: hashedPassword });
		if (insertId) return res.status(201).json({ msg: 'redirect', insertId, redirect: true });
	} catch (e) {
		return res.status(500).json({ error: e });
	}
});

// router.use('/login', loginValidation);
router.post('/login', loginValidation, async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) return res.status(400).json({ msg: 'fields are mandatory' });
	try {
		//check if user exist
		const user = await isUserExist(email);
		if (!user) return res.status(400).json({ error: 'user not exist' });
		//get hashed password
		const hashedPassword = await getHashedPassword(user.email);
		//validate password
		const passwordCheck = await compareHashPassword(password, hashedPassword.password);
		if (!passwordCheck) return res.status(400).json({ msg: 'password incorrect' });
		//create token
		const jwtToken = await getJwt({ ...user, password: null });
		res.json({ msg: 'redirect', token: jwtToken });
	} catch (e) {
		res.status(400).json({ error: 'bad request' });
	}
});

router.get('/verify', async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		console.log(authorization);
		jwt.verify(authorization, process.env.SECRET, (err, decoded) => {
			if (err) return res.json({ status: false });
			const { id, firstname, lastname, email } = decoded;
			return res.json({ status: true, user: { id, firstname, lastname, email } });
		});
	} catch (ex) {
		return res.json({ status: false });
	}
});

module.exports = router;
