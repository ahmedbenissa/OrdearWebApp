import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Captcha from "../../Components/Captcha";

import GmailLogo from "./logo2.svg"
export default function LoginClient(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [password, setPassword] = useState("");


    const [user,setUser]=useState({})
    console.log(searchParams.get("q"))
    const navigate = useNavigate();
         console.log(searchParams.get("q"))
    const redirectToClientInterface = event =>
        {
         localStorage.setItem('token',searchParams.get("q"))
         console.log(localStorage.token)
         navigate('/payment_methods')
        }
           useEffect(()=>{ 
               const token = {
                   token:searchParams.get("q")
               }  
               axios.post('/auth/get_authentified_user/',token).then((res)=>{
                   console.log(res)
                 
               })
             
           },[])  
         
    return(
        <section class="min-vh-100 mb-8">
         <div style={{background:"#1a2e47" ,  height:"80px"}}>
       <img src="assetsTemplates/images/Logo.png"  style={{ marginBottom:"20px" , marginLeft:"10px", width: "50px", height: "50px" }}></img>
    </div>
        <span class="mask bg-gradient-dark opacity-6"></span>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-5 text-center mx-auto">
           
              <h1 class="text-dark mb-2 mt-5">Welcome!</h1>
              <p class="text-lead text-dark">Your account is set up Please click on the link below</p>
            </div>
          </div>
        </div>
      
      
      <Captcha></Captcha>
      <button type="button" class="btn bg-gradient-dark w-50 my-4 mb-2"  onClick={redirectToClientInterface}>Confirm your account</button>
      </section>
        
    )
}