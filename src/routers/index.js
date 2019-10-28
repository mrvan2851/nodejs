
const authRoute = require('./auth.route')
const userRoute = require('./user.route')
const cors = require('cors')

module.exports = function(app){
	app.use(cors())
	app.use('/api/auth' ,  authRoute)
	app.use('/api/users'  , userRoute)
}
