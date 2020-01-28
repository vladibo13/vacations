const express = require('express');
const router = express.Router();
const { registerValidation, loginValidation } = require('../validations/userValidation');
const userController = require('../controllers/userController');

router.route('/register').post(registerValidation, userController.register);
router.route('/login').post(loginValidation, userController.login);
router.route('/verify').get(userController.verify);

module.exports = router;
