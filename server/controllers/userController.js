const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { saveUser, isUserExist, getHashedPassword } = require('../utils/queryHelpers');
const { registerValidation, loginValidation } = require('../validations/userValidation');
const { hashPassword, compareHashPassword } = require('../utils/hashPassword');
const { getJwt } = require('../utils/createJWT');

async function register(req, res, next) {
	const { email, password } = req.body;
	try {
		const user = await isUserExist(email);
		if (user) return res.json({ msg: 'user already exist' });
		const hashedPassword = await hashPassword(password);
		const insertId = await saveUser({ ...req.body, password: hashedPassword });
		if (insertId) return res.status(201).json({ msg: 'redirect', insertId, redirect: true });
	} catch (ex) {
		return res.status(500).json({ error: ex });
	}
}

async function login(req, res, next) {
	const { email, password } = req.body;

	try {
		const user = await isUserExist(email);
		if (!user) return res.status(400).json({ error: 'user not exist' });
		const hashedPassword = await getHashedPassword(user.email);
		const passwordCheck = await compareHashPassword(password, hashedPassword.password);
		if (!passwordCheck) return res.status(400).json({ msg: 'password incorrect' });
		const jwtToken = await getJwt({ ...user, password: null });
		res.json({ msg: 'redirect', token: jwtToken });
	} catch (ex) {
		res.status(400).json({ error: ex });
	}
}

async function verify(req, res, next) {
	try {
		const { authorization } = req.headers;
		jwt.verify(authorization, process.env.SECRET, (err, decoded) => {
			if (err) return res.json({ status: false });
			const { id, firstname, lastname, email, role } = decoded;
			return res.json({ status: true, user: { id, firstname, lastname, email, role } });
		});
	} catch (ex) {
		return res.json({ status: false, error: ex });
	}
}

module.exports = { register, login, verify };
