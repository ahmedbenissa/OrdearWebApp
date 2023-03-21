
const exp=require('express')
const route=exp.Router()
const users=require('../Entities/User')
const bcrypt=require('bcryptjs')
const CryptoJS=require('crypto-js')
const jwt=require('jsonwebtoken')
const sessions = require('../Entities/UserSession')
const Post = require('../Entities/Post')
const { session } = require('passport')
const ResponsibleAuthController=require('../controllers/ResponsibleAuthentication')
route.post('/add_franchise_responsible',ResponsibleAuthController.AddFranchiseResponsible)
route.post('/Login/:email',ResponsibleAuthController.Login)
route.post('/login_as_a_franchise_responsible/:email',ResponsibleAuthController.Responsible_Login)
route.post('/add_restaurant_responsible',ResponsibleAuthController.AddResponsibleRestaurant)
route.put("/set_password/:id",ResponsibleAuthController.setPassword)  
route.post("/auth_employee",ResponsibleAuthController.Get_Authenticated_User)             
route.post("/ForgotPassword",ResponsibleAuthController.ForgotPassword); 
route.post('/check_reset_password_link_duration',ResponsibleAuthController.reset_password_link) 
route.get('/list_users',ResponsibleAuthController.list_users);
route.post('/sign_up_super_admin',ResponsibleAuthController.sign_up_super_admin)     
                
module.exports=route