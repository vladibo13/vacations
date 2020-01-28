const {
	getAllVacations,
	getLikedVacations,
	addVacation,
	deleteVacation,
	updateVacation,
	getVacationFromFollowersByID,
	deleteVacationFromFollowersByID
} = require('../utils/queryHelpers');

async function getAll(req, res, next) {
	try {
		const vacations = await getAllVacations();
		res.status(200).json({ msg: 'successfully fetched all records', vacations });
	} catch (ex) {
		res.status(400).json({ msg: ex });
	}
}

async function getAllFiltred(req, res, next) {
	const { userID } = req.body;
	try {
		const vacations = await getAllVacations();
		const likedVacations = await getLikedVacations(userID);
		const vFinal = vacations.map((v) => {
			const found = likedVacations.find((r) => r.id === v.id);
			if (found) return { ...v, isSelected: true };
			return { ...v, isSelected: false };
		});
		res.status(200).json({ msg: 'successfully fetched all filtred records', vacations: vFinal });
	} catch (ex) {
		res.status(400).json({ msg: ex });
	}
}

async function addOne(req, res, next) {
	const { description, destination, picture, from_date, to_date, all_followers, cost } = req.body;

	try {
		const result = await addVacation(description, destination, picture, from_date, to_date, all_followers, cost);
		const vacations = await getAllVacations();
		res
			.status(200)
			.json({ vacations, msg: 'successfully added one record', id: result[0].affectedRows + ' created' });
	} catch (ex) {
		res.status(400).json([ { msg: ex } ]);
	}
}

async function removeOne(req, res, next) {
	const { userID, vacationID } = req.body;
	try {
		const resultVacFol = await getVacationFromFollowersByID(vacationID);
		if (resultVacFol.length) await deleteVacationFromFollowersByID(vacationID);
		const deleteVacationResult = await deleteVacation(vacationID);
		const vacations = await getAllVacations();
		res.status(200).json({
			vacations,
			msg: 'successfully removed one record',
			id: deleteVacationResult[0].affectedRows + ' deleted'
		});
	} catch (ex) {
		res.status(400).json({ msg: ex });
	}
}

async function updateOne(req, res, next) {
	const { description, destination, picture, from_date, to_date, cost, id } = req.body;

	try {
		const result = await updateVacation(description, destination, picture, from_date, to_date, cost, id);
		const vacations = await getAllVacations();
		res.status(200).json({ vacations, msg: 'sucsuccessfully updated one record', result });
	} catch (ex) {
		res.status(400).json({ msg: ex });
	}
}

module.exports = { getAll, getAllFiltred, addOne, removeOne, updateOne };
