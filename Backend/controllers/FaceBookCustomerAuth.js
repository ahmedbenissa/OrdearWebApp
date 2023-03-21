const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const exp=require('express')


const render_fb_login_interface= passport.authenticate('facebook', {
        scope: ['public_profile', 'email']
      })
const facebook_callback= passport.authenticate('facebook', {
  successRedirect: 'http://localhost:8000/auth/facebook/profile',
  failureRedirect: '/error'
})
const Facebook_Auth=function (req, res) {
    res.send(req.user)
  }
module.exports={
    render_fb_login_interface,facebook_callback,Facebook_Auth
}
