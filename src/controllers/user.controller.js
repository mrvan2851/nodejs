const User = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  { registerValidationCreateUser }  = require('../helpers/validation')

/* register new user */
module.exports.register = async (req, res)=>{

	const { error } = registerValidationCreateUser(req.body)
	if( error ){
		return res.status(400).json({
			message : error
		})
	}
	
	/* check email is exists */
	try {
		const emailExist = await User.findOne({email : req.body.email })
		if( emailExist ){
			return res.status(400).json({
				message : 'Email is exists'
			})
		}
	} catch (error) {
		return res.status(500).json({
			message : error
		})
	}
	
	/* hash password before save */
	const salt = bcrypt.genSaltSync(10)
	const hash  = bcrypt.hashSync(req.body.password, salt) 
	const user = new User({
		name : req.body.name,
		email :req.body.email,
		password : hash,
	})
	try {
		const createData= await user.save()
		res.status(200).json({
			data : createData
		})
	} catch (err) {
		return res.status(500).json({
			message : error
		})
	}
};


/* get list users */
module.exports.getListUsers = async (req, res)=>{
	try {
		const users = await User.find({} , ['_id' , 'email' ,'name'])
		return res.status(200).json({
			data : users
		})
	} catch (error) {
		return res.status(500).json({
			message : error
		})
	}
};

