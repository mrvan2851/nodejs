const router = require("express").Router();
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const  {
	registerValidationCreateUser,
	loginValidation
}  = require('../common/validation')

router.get('/' , async (req, res)=>{
	res.send('Hello user page')
})
router.post('/' , async (req, res)=>{
	/* Validate form */
	const { error } = registerValidationCreateUser(req.body)
	if( error ){
		return res.status(200).json({
			message : error
		})
	}
	
	/* check email is exists */
	try {
		const emailExist = await User.findOne({email : req.body.email })
		if( emailExist ){
			return res.status(200).json({
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
			status : true,
			data : user
		})
	} catch (err) {
		return res.status(500).json({
			message : error
		})
	}
})
module.exports = router