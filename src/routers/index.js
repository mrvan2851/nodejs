module.exports = function(app){
	const user = require('./user')
	app.use('/api/user' , user)
}