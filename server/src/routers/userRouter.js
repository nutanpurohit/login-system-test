const express = require('express')
const router = new express.Router()
const { createUser, loginUser } = require('../controllers/userController')

//new user creation
router.post('/users/register', createUser)

//user login
router.post('/users/login', loginUser)

module.exports = router
