import axios from "axios"

import { useState,useEffect } from "react"

import MuiPhoneNumber from 'material-ui-phone-number';
import { display } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Captcha from "../Components/Captcha";
import { TextField } from "@material-ui/core";


export default function RequestForgotPasswordResponsible()
{
  const [User,setUser]=useState({"username":"","email":"","password":"","address":"","phone":"","image":"","restaurant":""})
 
  const navigate = useNavigate();


 const handleChange2= event => {
  // event.preventDefault()
   console.log(event.target.value)
    User.email=event.target.value
    setUser(User)
 }
 
 
const Confirm = event => 
{
    
    axios.post('/mail/forgot_password_responsible/'+User.email).then((res)=>{console.log(res) 
    if(res.status==200){
        alert('check your mailbox')
    }})                
}
 
  
 
    return (
   <main class="main-content  mt-0">
    <section class="min-vh-100 mb-8">
      <div style={{backgroundColor:"#132842",height:"80px"}} ></div>
        <span class="mask bg-gradient-dark opacity-6"></span>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-5 text-center mx-auto">
              <h1 class="text-dark mb-2 mt-5">Please Type your Email!</h1>
              <p class="text-lead text-white">Enter your Email</p>
            </div>
          </div>
        </div>
      
      <div class="container">
        <div class="row mt-lg-n10 mt-md-n11 mt-n10">
          <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
            <div class="card z-index-0">
           
              <div class="card-body">
                <form role="form text-left">
                
                  
                    <TextField type="email"  placeholder="Email" aria-label="Email" aria-describedby="email-addon" onChange={handleChange2}/>
                  <br></br><br></br>
                  <Captcha></Captcha>
                  <div class="text-center">
                    <button type="button" class="btn bg-gradient-dark text-white w-100 my-4 mb-2"  onClick={Confirm}>confirm</button>
                  </div>
                
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
   </main>
    )
}