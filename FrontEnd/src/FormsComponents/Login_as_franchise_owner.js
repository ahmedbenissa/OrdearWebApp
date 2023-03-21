import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function LoginResp_Franchise(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [password, setPassword] = useState();


    const [user,setUser]=useState({})
    console.log(searchParams.get("q"))
    const navigate = useNavigate();
         console.log(searchParams.get("q"))
    const redirectToFranchiseResponsibleDashboard = event =>{
        localStorage.setItem('franchise_responsible_token',searchParams.get("q"))
        console.log(localStorage.franchise_responsible_token)
        /***
         * useNavigate to redirect to dashboard
         */
      navigate('/franchise_owner_dashboard')
    }
    const handleChange2= event => {
         event.preventDefault()
         console.log(event.target.value)
          
          setPassword(event.target.value)
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
    return(
      
        <section class="min-vh-100 mb-8">
      <div class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"    style={{
        backgroundImage: `url(/assets/img/curved-images/curved14.jpg)`}}>
        <span class="mask bg-gradient-dark opacity-6"></span>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-5 text-center mx-auto">
              <h1 class="text-white mb-2 mt-5">Welcome!</h1>
              <p class="text-lead text-white">Your account is set up Please click on the link below</p>
            </div>
          </div>
        </div>
      
      </div>
      <div class="mb-3">
                    <input type="password" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="email-addon" onChange={handleChange2}/>
     </div>
     <button className="btn bg-gradient-dark w-100 my-4 mb-2" onClick={changePassword}>set Password</button>
      <button type="button" class="btn bg-gradient-dark w-100 my-4 mb-2"  onClick={redirectToFranchiseResponsibleDashboard}>Confirm your account</button>
      </section>
        
    )
}