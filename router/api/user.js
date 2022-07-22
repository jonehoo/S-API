const express = require('express')
const router = express.Router()

const {alluser,login,userInfo,register,revise}=require('../../src/user')
router.get('/alluser', alluser)
router.get('/login', login)
router.get('/userInfo', userInfo)
router.post('/register', register)
router.post('/revise', revise)
module.exports = router