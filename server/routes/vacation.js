const express = require('express');
const router = express.Router();
const { vacationValidation, vacationIDValidation, userIDValidation } = require('../validations/vacationValidation');
const vacationController = require('../controllers/vacationController');

router
	.route('/')
	.get(vacationController.getAll)
	.post(vacationValidation, vacationController.addOne)
	.put(vacationController.updateOne)
	.delete(vacationIDValidation, vacationController.removeOne);

router.route('/filtred').post(userIDValidation, vacationController.getAllFiltred);

module.exports = router;
