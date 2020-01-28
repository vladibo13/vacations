const express = require('express');
const router = express.Router();
const chartController = require('../controllers/chartContoller');

router.route('/').get(chartController.getCharts);

module.exports = router;
