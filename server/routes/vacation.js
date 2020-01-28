const express = require('express');
const router = express.Router();
const { vacationValidation } = require('../validations/vacationValidation');
const vacationController = require('../controllers/vacationController');

router
	.route('/')
	.get(vacationController.getAll)
	.post(vacationValidation, vacationController.addOne)
	.put(vacationController.updateOne)
	.delete(vacationController.removeOne);

router.route('/filtred').post(vacationController.getAllFiltred);

module.exports = router;
