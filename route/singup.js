const express=require('express')
const router=express.Router()
const controller= require('../controller/signup')

// signUp and Login route
router.post('/signup',controller.signUp)
router.post('/login',controller.login)
router.post('/google-login',controller.googlelogin)

module.exports=router