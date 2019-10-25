const router = require("express").Router();
const  UserController = require('../controllers/user')

/* get list user */
router.get('/' , UserController.getListUsers)

/* register a new user */
router.post('/' , UserController.register)


module.exports = router