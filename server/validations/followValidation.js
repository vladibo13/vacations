const Joi = require('@hapi/joi');

const followSchema = Joi.object({
	vacationID: Joi.number().required(),
	userID: Joi.number().required()
});

function followvalidation(req, res, next) {
	const { error } = followSchema.validate(req.body);
	if (error) return res.status(400).json({ msg: error.details[0].message });
	next();
}

module.exports = { followvalidation };
