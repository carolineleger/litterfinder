const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const auth = require('../../../config/auth')

router.get('/account', auth, userController.getUserDetails)
router.post('/register', userController.registerNewUser)
router.post('/login', userController.loginUser)

module.exports = router
