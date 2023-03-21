const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const exp=require('express')
const route=exp.Router()
const FacebookController=require("../controllers/FaceBookCustomerAuth")
route.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
  }));
  const path = require('path')
  const process=require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
  route.use(passport.initialize());
  route.use(passport.session());
  
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }; 
  passport.use(new FacebookStrategy({
      clientID:process.parsed.FACEBOOK_ID ,
      clientSecret: process.parsed.FACEBOOK_SECRET,
      callbackURL: 'http://localhost:8000/auth/facebook/callback'
    }, function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  ));
  route.get('/facebook',FacebookController.render_fb_login_interface);  
  route.get('/facebook/callback',FacebookController.facebook_callback);
  route.get('/facebook/profile', isLoggedIn, FacebookController.Facebook_Auth);
module.exports=route;