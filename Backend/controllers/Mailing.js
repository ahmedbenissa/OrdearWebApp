const nodemailer = require('nodemailer');
const express= require('express')
const bcrypt=require('bcryptjs')
const CryptoJS=require('crypto-js')
const jwt=require('jsonwebtoken')
const Mailing = (req,res)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'baissahmed@gmail.com',
          pass: 'crxxmebbhxnbatdd'
        }
      });
      
      var mailOptions = {
        from: 'baissahmed@gmail.com',
        to: req.params.email,
        subject: req.params.subject,
        text: req.body.text
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          res.send('Email sent: ' + info.response);
        }
      });
}
const MailingForgotPasswordCustomer = (req,res)=>{
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'baissahmed@gmail.com',
        pass: 'crxxmebbhxnbatdd'
      }
    });
    let link =  'http://localhost:3000/forgot_password_customer?q='+req.params.email
    var mailOptions = {
      from: 'baissahmed@gmail.com',
      to: req.params.email,
      subject: "Forgot Password",
      text: '<a href="'+link+'"></a>'
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        res.send('Email sent: ' + info.response);
      }
    });
}

const MailingForgotPasswordResponsible = (req,res)=>{
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'baissahmed@gmail.com',
        pass: 'crxxmebbhxnbatdd'
      }
    });
    var hash = CryptoJS.SHA256(req.params.email+req.body.password)
    let jwtSecretKey = hash.toString(CryptoJS.enc.Base64);
    let data = {
        time: Date(),
        Email:req.params.email,
       // iss:hash
    }
    let  init_time=new Date(Date.now())
    let  auth_token_expire=new Date(Date.now()+(0.2)*3600000)
    const auth_token = jwt.sign(data, jwtSecretKey);
    console.log(auth_token)
    console.log("expire=>"+auth_token_expire)
  
   let link =  'http://localhost:8000/resp/check_reset_password_link_duration'
    var mailOptions = {
      from: 'baissahmed@gmail.com',
      to: req.params.email,
      subject: "Forgot Password",
      text: '<a href="'+link+'"></a>',
      html:'<h1>Click on the link Below 👇</h1>'+
      
      '<p style="color:red ; font-family:verdana;">'+"this link expires in 10 minutes"+'</p>'+
      ' <form  action="'+link+'"'+ 'method="POST" > '+
      ' <input type="text" value="'+req.params.email+'"' +'id="email" name="email"  style="display:none"> '+
      ' <input type="text" value="'+auth_token+'"' +'id="auth_token" name="auth_token"  style="display:none"> '+
      ' <input  value="'+auth_token_expire+'"' +'id="auth_token_expire" name="auth_token_expire"  style="display:none"> '+ 
      ' <input  type="submit" value="Submit"></form> '
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        res.send('Email sent: ' + info.response);
      }
    });
}
const validate_customer=(req,res)=>{
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'baissahmed@gmail.com',
        pass: 'crxxmebbhxnbatdd'
      }
    });
    console.log(req.body.password)
    var hash = CryptoJS.SHA256(req.params.email+req.body.password)
      
      let jwtSecretKey = hash.toString(CryptoJS.enc.Base64);
      let data = {
          time: Date(),
          Email:req.params.email,
         // iss:hash
      }
      let  init_time=new Date(Date.now())
      let  auth_token_expire=new Date(Date.now()+(0.2)*3600000)
      const auth_token = jwt.sign(data, jwtSecretKey);
      console.log(auth_token)
      console.log("expire=>"+auth_token_expire)
    var link="http://localhost:8000/customers/login/"+req.params.email+"/"
    var mailOptions = {
      from: 'baissahmed@gmail.com',
      to: req.params.email,
      subject: req.params.subject,
      text: req.body.text,
      html:
      '<h1>this is your authorization token</h1>'+
      '<p>'+auth_token+'</p>'+
      ' <form action="'+link+'"'+ 'method="POST" > '+
      ' <input type="password" value="'+req.body.password+'"' +'id="password" name="password" placeholder="Enter password" style="display:none"> '+
      ' <input type="text" value="'+auth_token+'"' +'id="auth_token" name="auth_token"  style="display:none"> '+
      ' <input  value="'+auth_token_expire+'"' +'id="auth_token_expire" name="auth_token_expire"  style="display:none"> '+ 
      ' <input type="submit" value="Submit"></form> '
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        res.send('Email sent: ' + info.response);
      }
    });
}
const validateEmployee = (req,res)=>{
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'baissahmed@gmail.com',
        pass: 'crxxmebbhxnbatdd'
      }
    });
    console.log(req.body.password)
    var hash = CryptoJS.SHA256(req.params.email+req.body.password)
      
      let jwtSecretKey = hash.toString(CryptoJS.enc.Base64);
      let data = {
          time: Date(),
          Email:req.params.email,
         // iss:hash
      }
      let  init_time=new Date(Date.now())
      let  auth_token_expire=new Date(Date.now()+(0.2)*3600000)
      const auth_token = jwt.sign(data, jwtSecretKey);
      console.log(auth_token)
      console.log("expire=>"+auth_token_expire)
    var link="http://localhost:8000/employees/login_employee/"+req.params.email+"/"
    var mailOptions = {
      from: 'baissahmed@gmail.com',
      to: req.params.email,
      subject: req.params.subject,
      text: req.body.text,
      html:
      '<h1>this is your authorization token</h1>'+
      '<p>'+auth_token+'</p>'+
      ' <form action="'+link+'"'+ 'method="POST" > '+
      ' <input type="password" value="'+req.body.password+'"' +'id="password" name="password" placeholder="Enter password" style="display:none"> '+
      ' <input type="text" value="'+auth_token+'"' +'id="auth_token" name="auth_token"  style="display:none"> '+
      ' <input  value="'+auth_token_expire+'"' +'id="auth_token_expire" name="auth_token_expire"  style="display:none"> '+ 
      ' <input type="submit" value="Submit"></form> '
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        res.send('Email sent: ' + info.response);
      }
    });
}
const validateResponsible = (req,res)=>{
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'baissahmed@gmail.com',
        pass: 'crxxmebbhxnbatdd'
      }
    });
    console.log("password=>",req.body.password)
    var hash = CryptoJS.SHA256(req.params.email+req.body.password)
      
      let jwtSecretKey = hash.toString(CryptoJS.enc.Base64);
      let data = {
          time: Date(),
          Email:req.params.email,
         // iss:hash
      }
      let  init_time=new Date(Date.now())
      let  auth_token_expire=new Date(Date.now()+(0.2)*3600000)
      const auth_token = jwt.sign(data, jwtSecretKey);
      console.log(auth_token)
      console.log("expire=>"+auth_token_expire)
    var link="http://localhost:8000/resp/login_as_a_franchise_responsible/"+req.params.email+"/"
    var mailOptions = {
      from: 'baissahmed@gmail.com',
      to: req.params.email,
      subject: req.params.subject,
      text: req.body.text,
      html:
      '<h1>this is your authorization token</h1>'+
      '<p>'+auth_token+'</p>'+
      ' <form action="'+link+'"'+ 'method="POST" > '+
      ' <input type="password" value="'+req.body.password+'"' +'id="password" name="password" placeholder="Enter password" style="display:none"> '+
      ' <input type="text" value="'+auth_token+'"' +'id="auth_token" name="auth_token"  style="display:none"> '+
      ' <input  value="'+auth_token_expire+'"' +'id="auth_token_expire" name="auth_token_expire"  style="display:none"> '+ 
      ' <input type="submit" value="Submit"></form> '
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        res.send('Email sent: ' + info.response);
      }
    });
}
module.exports={
  Mailing,validate_customer,validateEmployee,validateResponsible,MailingForgotPasswordCustomer,MailingForgotPasswordResponsible
}