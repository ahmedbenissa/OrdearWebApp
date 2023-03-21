const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;





app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));
const path = require('path')
const process=require('dotenv').config({ path: path.resolve(__dirname, './.env') });
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
  console.log(user)
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
 
passport.use(new FacebookStrategy({
    clientID:process.parsed.FACEBOOK_ID ,
    clientSecret: process.parsed.FACEBOOK_SECRET,
    callbackURL: '/customers/auth/facebook/callback'
  }, function (accessToken, refreshToken, profile, done) {
    console.log(accessToken)
    console.log(refreshToken)
    return done(null, profile,accessToken,refreshToken);
  }
));


app.get('/customers/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
  }));  
app.get('/customers/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/customers/auth/facebook/profile',
      failureRedirect: '/error'
    }));
function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
          return next();
        res.redirect('/');
      }
;
app.get('/customers/auth/facebook/profile', isLoggedIn, function (req, res) {
    res.send(req.user)
  });
app.listen(process.parsed.PORT, () => {
  console.log('App listening on port ' + process.parsed.PORT);
});