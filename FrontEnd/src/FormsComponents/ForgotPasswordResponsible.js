import { TextField } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Captcha from "../Components/Captcha";

export default function ForgotPasswordResponsible(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [password, setPassword] = useState("");
    const [user,setUser]=useState({})
    console.log(searchParams.get("q"))
    const navigate = useNavigate();
         console.log(searchParams.get("q"))
    const redirect = event =>{
      
    }
const handleChange2= event => 
       {

          event.preventDefault()
          console.log(event.target.value)
          setPassword(event.target.value)
       }
const changePassword = e   => {
                e.preventDefault()
               const t=searchParams.get('q')
               const pass= {
                password:password,
                token:t
               }
               var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
               if(pass.password.match(passw)){
               axios.post("/resp/ForgotPassword/",pass).then((res)=>{console.log(res)
                
                
                axios.post('resp/Login/'+res.data[0].email,pass).then((res)=>{
                  console.log(res)
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
               
              }) 
            }
            else alert("your password must contain at least 1 Upcase letter 1 low case letter and number")
              
           }
    return(
      
        <section class="min-vh-100 mb-8">
        <div style={{backgroundColor:"#132842",height:"80px"}}></div>
        <span class="mask bg-gradient-dark opacity-6"></span>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-5 text-center mx-auto">
              <h1 class="text-dark mb-2 mt-5">Welcome!</h1>
              <p class="text-lead text-dark">Your account is set up Please click on the link below</p>
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
              <div className="row px-xl-5 px-sm-4 px-3"></div>
      <div className="card-body">
      <form role="form text-left">
                    <TextField type="password"  placeholder="Password" aria-label="Password" aria-describedby="email-addon" onChange={handleChange2}/>
                    <Captcha></Captcha>
                    </form>
     </div>
     <br></br><br></br>
     
     <button className="btn bg-gradient-dark text-light w-2 my-4 mb-2" onClick={changePassword}>set Password</button><br></br><br></br>
      <button type="button" class="btn text-light bg-gradient-dark w-2 my-4 mb-2"  onClick={redirect}>Confirm your account</button><br></br><br></br>
      <div className="text-center">
      
      </div></div></div></div></div>
      </section>
        
    )
}