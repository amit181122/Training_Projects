const express = require('express');
const router = express.Router();

//const express = require('express').Router()

const {loginUser, createUser, updateUser, getUser, fallowUser, unFallowUser} = require("../controllers/userController")

//user API's
router.post('/login', loginUser)
router.post('/create', createUser)
router.put('/update/:id', updateUser)
router.get('/getbyid/:userId', getUser)
router.put('/fallow/:paramsId', fallowUser)
router.put('/unfallow/:paramsId', unFallowUser)

module.exports = router