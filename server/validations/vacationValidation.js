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

const vacationIDSchema = Joi.object({
	vacationID: Joi.number().required()
});

const userIDSchema = Joi.object({
	userID: Joi.number().required()
});

function vacationValidation(req, res, next) {
	const { error } = vacationSchema.validate(req.body);
	if (error) return res.status(400).json({ msg: error.details[0].message });
	next();
}

function vacationIDValidation(req, res, next) {
	const { error } = vacationIDSchema.validate(req.body);
	if (error) return res.status(400).json({ msg: error.details[0].message });
	next();
}
function userIDValidation(req, res, next) {
	const { error } = userIDSchema.validate(req.body);
	if (error) return res.status(400).json({ msg: error.details[0].message });
	next();
}

module.exports = { vacationValidation, vacationIDValidation, userIDValidation };
