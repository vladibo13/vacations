const { getUserCharts } = require('../utils/queryHelpers');

async function getCharts(req, res, next) {
	try {
		const result = await getUserCharts();
		const destinations = result.map((dest) => dest.destination);
		const followers = result.map((foll) => foll.all_followers);
		res.json({ msg: 'success', destinations, followers });
	} catch (ex) {
		res.json(400).json({ msg: 'bad request' + ex });
	}
}

module.exports = { getCharts };
