const Joi = require('@hapi/joi');

const registerValidationCreateUser = (data) =>{
	const schema = Joi.object({
		name : Joi.string().min(6).required(),
		email : Joi.string().min(6).required().email(),
		password : Joi.string().min(6).required()
	})
	return schema.validate(data, { abortEarly: false });
}
const loginValidation = (data) =>{
	const schema = Joi.object({
		email : Joi.string().min(6).required().email(),
		password : Joi.string().min(6).required()
	})
	return schema.validate(data , { abortEarly: false });
}
module.exports.registerValidationCreateUser = registerValidationCreateUser 
module.exports.loginValidation = loginValidation 