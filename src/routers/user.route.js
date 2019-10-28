const router = require("express").Router();
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')
/* get list user */
router.get('/' , [authMiddleware]  , userController.getListUsers)

/* register a new user */
router.post('/user' , [authMiddleware]  ,userController.register)


module.exports = router