const AuthRoutes= require("./Auth")
const MailRoutes= require("./Mailing")
const paymentRoutes = require("./Payment")
const menuRouter= require("./menu.router")
const restaurantRouter = require('./restaurant.router')
const categoryRouter = require('./category.router')
const productRouter = require('./product.router')
const choiceRouter = require('./choice.router')
const itemRouter = require('./item.router')

const { createProxyMiddleware } = require('http-proxy-middleware');
const exp=require('express')

const path = require('path')
const process=require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const route=exp.Router()
route.use(exp.json());
route.use(exp.urlencoded());
let port=process.parsed.PORT
route.use('/employees',require('./EmployeeManagment'),createProxyMiddleware({ target: 'http://localhost:'+port, changeOrigin: true }))
route.use('/customers',AuthRoutes,createProxyMiddleware({ target: 'http://localhost:'+port, changeOrigin: true }))
route.use('/mail',MailRoutes,createProxyMiddleware({ target: 'http://localhost:'+port, changeOrigin: true }))
route.use('/customer_payments',paymentRoutes,createProxyMiddleware({ target: 'http://localhost:'+port, changeOrigin: true }))
route.use('/images',require('./uploadroutes'),createProxyMiddleware({ target: 'http://localhost:'+port, changeOrigin: true }))
route.use('/auth',require('./FaceBookAuthCustomer'),createProxyMiddleware({ target: 'http://localhost:'+port, changeOrigin: true }))
route.use('/restaurant',require('./RestaurantManagment'),createProxyMiddleware({ target: 'http://localhost:'+port, changeOrigin: true }))
route.use('/posts',require('./PostMangment'),createProxyMiddleware({ target: 'http://localhost:'+port, changeOrigin: true }))
route.use('/resp',require('./ResponsibleAuth'),createProxyMiddleware({ target: 'http://localhost:'+port, changeOrigin: true }))
route.use('/franchises',require('./FranchiseMangement'),createProxyMiddleware({ target: 'http://localhost:'+port, changeOrigin: true }))
route.use('/menu',menuRouter)
route.use('/restaurant' ,restaurantRouter)
route.use('/category' ,categoryRouter)
route.use('/product' ,productRouter)
route.use('/choice' ,choiceRouter)
route.use('/item' ,itemRouter)

module.exports=route