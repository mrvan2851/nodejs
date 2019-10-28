const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
	name : {
		type : String,
		require : true,
		min : 6,
		max : 255,
	},
	email : {
		type : String,
		require : true,
		min : 6,
		max : 255,
	},
	password : {
		type : String,
		require : true,
		min : 6,
		max : 1024,
	},
	date: {
		type : Date,
		default : Date.now
	}
})
UserSchema.plugin(mongoosePaginate);

UserSchema.methods.comparePassword = (payload)=>{
	return bcrypt.compareSync(payload, this.password);
};
UserSchema.methods.getList = async (payload)=>{
	let { query = {} , options = {} } = payload
	return await Model.paginate(query, options);
}

module.exports = mongoose.model('User' , UserSchema)