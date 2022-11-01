const Joi = require("joi")


const schema = Joi.object({
    firstName: Joi.string().regex(/^[a-zA-Z]+$/).required().messages({'string.pattern.base': `First Name must have only alphabetic letters.`}),
    lastName: Joi.string().regex(/^[a-zA-Z]+$/).required().messages({'string.pattern.base': `Last Name must have only alphabetic letters.`}),
    email: Joi.string().email().allow(null, ''),
    phoneNumber: Joi.string().regex(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/).allow(null, '').messages({'string.pattern.base': `Phone number is not correct.`}),
    supervisor: Joi.string().required(),
})

module.exports = schema
