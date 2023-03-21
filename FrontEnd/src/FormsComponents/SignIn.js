import axios from "axios"

import { useState,useEffect, useRef } from "react"

import MuiPhoneNumber from 'material-ui-phone-number';
import { useNavigate } from "react-router-dom";
import Captcha from "../Components/Captcha";
import { TextField } from "@material-ui/core";


export default function Sign_In()
{
  const [User,setUser]=useState({"username":"","email":"","password":"","address":"","phone":"","image":"","role":"" ,"restaurant":""})
  const [list,setList]=useState([])
  const [list2,setList2]=useState([])
  const [value, setValue] = useState()
  const [token,setToken] = useState("")
  const navigate = useNavigate();

 
  

 const handleChange2= event => {
  // event.preventDefault()
   console.log(event.target.value)
    User.email=event.target.value
    setUser(User)
 }
 const handleChange3= event => {
  // event.preventDefault()
   console.log(event.target.value)
    User.password=event.target.value
    setUser(User)
 }

 const Confirm = event => {
  console.log(User)
   const user={
  
    email:User.email,
    password:User.password,
  
   }
   const pass={password:User.password}
  axios.post('resp/Login/'+user.email,pass).then((res)=>{
    console.log(res)
    if(res.data=="incorrect credentials")
    {
        alert("incorrect credentials")
    }
    let token=res.data[0].token_parsed
    
    axios.get('employees/get_role/'+res.data[0].employee).then((res)=>{
        console.log(res)
      console.log(token)
        if(res.data[0].post=='responsible_restaurant') {
            localStorage.setItem('restaurant_responsible_token',token)
            navigate('/restaurant_owner_dashboard')
        }
        console.log(res)
        if(res.data[0].post=='Responsible_Franchise') {
            localStorage.setItem('franchise_responsible_token',token)
            navigate('/franchise_owner_dashboard')
        }
        else if(res.data[0].post=='super-admin'){
            localStorage.setItem('super_admin_token',token)
            navigate('/super_admin_dash')
           
        }
       
    })
 })
}
console.log(User)
    console.log(list)
    return (
        <main className="main-content  mt-0">
    <section className="min-vh-100 mb-8">
    <div style={{background:"#1a2e47" ,  height:"80px"}}>
       <img src="assetsTemplates/images/Logo.png"  style={{ marginBottom:"20px" , marginLeft:"10px", width: "50px", height: "50px" }}></img>
    </div>
        <span className="mask bg-gradient-dark opacity-6"></span>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 text-center mx-auto">
              <h1 className="text-dark mb-2 mt-5">Welcome!</h1>
              <p className="text-lead text-dark">Login</p>
            </div>
          </div>
        </div>
      
      <div className="container">
        <div className="row mt-lg-n10 mt-md-n11 mt-n10">
          <div className="col-xl-4 col-lg-5 col-md-7 mx-auto">
            <div className="card z-index-0">
              <div className="card-header text-center pt-4">
                <h5>Register with</h5>
              </div>
              <div className="row px-xl-5 px-sm-4 px-3">
                
               
               
                <div className="mt-2 position-relative text-center">
                 
                </div>
              </div>
              <div className="card-body">
                <form role="form text-left">
               
                  <div className="mb-3">
                    <TextField type="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="email-addon" onChange={handleChange2}/>
                  </div>
                  <div className="mb-3">
                    <TextField type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="password-addon" onChange={handleChange3}/>
                  </div>
              
                  <div className="text-center">
                    <button type="button" className="btn bg-gradient-dark text-light w-100 my-4 mb-2"  onClick={Confirm}>Sign In</button>
                  </div>
                 <Captcha></Captcha>
                  <p className="text-sm text-dark mt-3 mb-0">forgot password? <a  href='/request_responsible_password'>click here</a></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section></main>
    )
                           
                           }