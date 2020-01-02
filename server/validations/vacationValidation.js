const Joi = require('@hapi/joi');

const vacationSchema = Joi.object({
	description: Joi.string().required(),
	destination: Joi.string().required(),
	picture: Joi.string().required(),
	date: Joi.date().required(),
	cost: Joi.number().required(),
	followers: Joi.number().required()
});

function vacationValidation(req, res, next) {
	const { error } = vacationSchema.validate(req.body);
	if (error) return res.status(400).json({ msg: error.details[0].message });
	next();
}

module.exports = { vacationValidation };
