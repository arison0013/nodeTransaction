const transactionController = require('../controllers/transactionController.js')
const express = require('express');
const checkAuth= require("../controllers/midleware/auth")
const router= express.Router()

router.post('/addtransaction',checkAuth, transactionController.addTransaction)

router.get('/getAlltransaction',checkAuth, transactionController.getAllTransaction)

router.post('/register',transactionController.registerUSer)

router.post('/login',transactionController.loginUser)


module.exports=router;

