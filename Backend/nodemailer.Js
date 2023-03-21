const nodemailer = require('nodemailer');
const express= require('express')
const bcrypt=require('bcryptjs')
const CryptoJS=require('crypto-js')
const jwt=require('jsonwebtoken')

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'baissahmed@gmail.com',
          pass: 'crxxmebbhxnbatdd'
        }
      });
      
      var mailOptions = {
        from: 'baissahmed@gmail.com',
        to: "ahmed.benaissa@esprit.tn",
        subject: "verification",
        text: "making sure that nodemailer works Unfortunately today i got errors while connection to cloud mongodb"
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          res.send('Email sent: ' + info.response);
        }
      });