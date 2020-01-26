const { getUserCharts } = require('../utils/queryHelpers');

async function getCharts(req, res, next) {
	try {
		console.log('hello from controller');
		const result = await getUserCharts();
		const destinations = result.map((dest) => dest.destination);
		const followers = result.map((foll) => foll.all_followers);
		res.json({ msg: 'success', destinations, followers });
	} catch (ex) {
		res.json(400).json({ msg: 'bad request' + ex });
	}
}

function dymmy(req, res, next) {
	res.json({ msg: 'dummy funtion' });
}

module.exports = { getCharts };
