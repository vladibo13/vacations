const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');
const { followvalidation } = require('../validations/followValidation');

router.route('/').post(followvalidation, followController.follow).delete(followvalidation, followController.unfollow);

module.exports = router;
