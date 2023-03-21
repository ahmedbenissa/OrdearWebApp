import { TextField } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Login_SuperAdmin(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [password, setPassword] = useState();
    const [user,setUser]=useState({})
    const navigate = useNavigate();
         console.log(searchParams.get("q"))
    const redirectToSuperAdminDash = event =>{
        localStorage.setItem('super_admin_token',searchParams.get("q"))
        console.log(localStorage.super_admin_token)
        /***
         * useNavigate to redirect to dashboard
         */
      navigate('/super_admin_dash')
    }
    useEffect(()=>{ 
      const token = {
          token:searchParams.get("q")
      }  
      axios.post('/resp/auth_employee',token).then((res)=>{
          console.log(res)
          axios.get('/employees/view_profile/'+res.data[0].employee).then((res)=>{
              console.log(res)
              setUser(res.data[0])
          })
      })
    
  },[])  
  const changePassword = e => {
    e.preventDefault()
      console.log(user)
      axios.put('/resp/set_password/'+user._id,{password:password}).then((res)=>{console.log(res)})
  }
    const handleChange2= event => {
      event.preventDefault()
        console.log(event.target.value)  
          setPassword(event.target.value)
       }
    return(
      
        <section class="min-vh-100 mb-8">
         <div style={{background:"#1a2e47" ,  height:"80px"}}>
       <img src="assetsTemplates/images/Logo.png"  style={{ marginBottom:"20px" , marginLeft:"10px", width: "50px", height: "50px" }}></img>
    </div>
        <span class="mask bg-gradient-dark opacity-6"></span>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-5 text-center mx-auto">
              <h1 class="text-white mb-2 mt-5">Welcome!</h1>
              <p class="text-lead mb-2 mt-5 text-white">Super Admin Portal</p>
            </div>
          </div>
        </div>
      
      
      <div class="mb-3">
        <TextField type="password"  placeholder="Password" aria-label="Password" aria-describedby="email-addon" onChange={handleChange2}/>
      </div>
     <button className="btn bg-gradient-dark text-white w-10 my-4 mb-2" onClick={changePassword}>set Password</button>
      <button type="button" class="btn bg-gradient-white text-white w-10 my-4 mb-2"  onClick={redirectToSuperAdminDash}>Confirm your account</button>
      </section>
        
    )
}