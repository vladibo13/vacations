const {
	removeFollowerByID,
	removeFromFollowCount,
	createFollowVacation,
	addToFollowCount
} = require('../utils/queryHelpers');

async function follow(req, res, next) {
	const { vacationID, userID } = req.body;

	try {
		const createQuery = await createFollowVacation(userID, vacationID);
		const updateQuery = await addToFollowCount(vacationID);
		res.status(200).json({
			msg: 'success post',
			createdRecord: `created ${createQuery[0].affectedRows} record`,
			updatedRecord: `updated ${updateQuery[0].affectedRows} record`
		});
	} catch (ex) {
		res.json({ msg: ex });
	}
}

async function unfollow(req, res, next) {
	const { vacationID, userID } = req.body;

	try {
		const updateQuery = await removeFromFollowCount(vacationID);
		const deleteQuery = await removeFollowerByID(userID, vacationID);
		res.status(200).json({
			msg: 'success',
			updateRecord: `updated ${updateQuery[0].affectedRows} record`,
			removedRecord: `removed ${deleteQuery[0].affectedRows} record`
		});
	} catch (ex) {
		res.status(400).json({ msg: ex });
	}
}

module.exports = { follow, unfollow };
// const express = require('express');
// const router = express.Router();
// const { followalidation } = require('../validations/followValidation');
// const followController = require('../controllers/followController');

// router.route('/').post(followalidation, followController.follow).delete(followalidation, followController.unfollow);

// module.exports = router;
