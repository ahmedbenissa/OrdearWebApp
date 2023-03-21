const express = require('express')
const app=express()
const mongoose=require("mongoose")
app.use(express.json())
app.use(express.urlencoded());

const path = require('path')
const process=require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const GlobalRoutes= require('./Routes/Index')

let url = process.parsed.DATABASE_URL
let port= process.parsed.PORT

mongoose.connect(url).then((res)=>{
  console.log("connected to DataBase")
}).catch((err)=>{
  console.log(err)
})

app.use(GlobalRoutes)
app.listen(port, async() => {
    console.log(`http://localhost:${port}`) 
  })
  