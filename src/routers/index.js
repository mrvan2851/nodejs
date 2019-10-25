const authMiddleware = require('../middlewares/auth')
const authRoute = require('./auth')
const userRoute = require('./user')
module.exports = function(app){
	app.use('/api/auth' ,  authRoute)
	app.use('/api/user' , authMiddleware  , userRoute )
}