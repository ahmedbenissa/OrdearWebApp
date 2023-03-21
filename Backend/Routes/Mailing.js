const nodemailer = require('nodemailer');
const express= require('express')
const bcrypt=require('bcryptjs')
const CryptoJS=require('crypto-js')
const jwt=require('jsonwebtoken')
const route=express.Router();
const MailingController = require('../controllers/Mailing')
route.post('/send_mail/:email/:subject',MailingController.Mailing)
route.post('/validate/:email/:subject',MailingController.validate_customer)
route.post('/validateEmployee/:email/:subject',MailingController.validateEmployee)
route.post('/validateResp/:email/:subject',MailingController.validateResponsible)
route.post('/forgot_password_customer/:email',MailingController.MailingForgotPasswordCustomer)
route.post('/forgot_password_responsible/:email',MailingController.MailingForgotPasswordResponsible)
module.exports=route
