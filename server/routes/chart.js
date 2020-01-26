const express = require('express');
const pool = require('../db/pool');
const router = express.Router();
const { getUserCharts } = require('../utils/queryHelpers');
const chartController = require('../controllers/chartContoller');

router.get('/', chartController.getCharts);

module.exports = router;
