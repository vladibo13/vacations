const Joi = require('@hapi/joi');

const userSchemaRegistration = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().required(),
	lastname: Joi.string().required(),
	firstname: Joi.string().required()
});

function registerValidation(req, res, next) {
	const { error } = userSchemaRegistration.validate(req.body);
	if (error) return res.json({ msg: error.details[0].message });
	next();
}

module.exports = { registerValidation };
