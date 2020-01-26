const Joi = require('@hapi/joi');

const vacationSchema = Joi.object({
	description: Joi.string().required(),
	destination: Joi.string().required(),
	picture: Joi.string().required(),
	from_date: Joi.string().required(),
	to_date: Joi.string().required(),
	cost: Joi.number().required(),
	all_followers: Joi.number().required()
});

function vacationValidation(req, res, next) {
	const { error } = vacationSchema.validate(req.body);
	console.log('ERROR = ', error);
	console.log('BODY = ', req.body);
	if (error) return res.status(400).json({ msg: error.details[0].message });
	next();
}

module.exports = { vacationValidation };
