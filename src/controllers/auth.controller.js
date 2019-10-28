const User = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  { loginValidation }  = require('../helpers/validation')

module.exports.login = async (req, res)=>{

	const { error } = loginValidation(req.body)
	if( error ){
		return res.status(400).json({
			message : error
		})
	}
	/* check email is exists */
	try {
		var user = await User.findOne({ email : req.body.email })
		if( !user ){
			return res.status(400).json({
				message : 'Email & password is wrong'
			})
		}
	} catch (error) {
		return res.status(500).json({
			message : error
		})
	}
	
	if( !user.comparePassword(req.body.password) ){
		return res.status(400).json({
			message : 'Email & password is wrong'
		})
	}
	const token = jwt.sign({ _id : user._id } , process.env.SECRET_KEY , { 
		expiresIn: 86400 // expires in 24 hours
	})
	return res.status(200).send({token})
};

/* get list users */
module.exports.getCurrentUser = (req, res)=>{
	User.findById( req.user._id , ['_id' , 'email' ,'name'] , (err, user)=>{
		if( err ){
			return res.status(401).json({
				message : error
			})
		}else{
			return res.status(200).json({
				data : user
			})
		}
	})
};