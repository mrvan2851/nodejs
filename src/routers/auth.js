const router = require("express").Router();
const  AuthController = require('../controllers/auth')

router.post('/' , AuthController.login)

module.exports = router