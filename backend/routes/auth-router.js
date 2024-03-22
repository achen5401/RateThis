const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/auth-controller')

router.post('/register', AuthController.registerUser)
router.post('/login', AuthController.loginUser)
router.post('/googleSignIn', AuthController.googleSignIn)
router.get('/logout', AuthController.logoutUser)
router.get('/isLoggedIn', AuthController.getLoggedIn)

module.exports = router