import { TextField } from "@material-ui/core";
import { height } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../Components/NavbarComponent/NavBar";

export default function LoginResp_res(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [password, setPassword] = useState();
    const [user,setUser]=useState({})
    const navigate = useNavigate();
         console.log(searchParams.get("q"))
    const redirectToRestaurantResponsibleDashboard = event =>{
      event.preventDefault()
        localStorage.setItem('restaurant_responsible_token',searchParams.get("q"))
        console.log(localStorage.restaurant_responsible_token)
        navigate('/restaurant_owner_dashboard')
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
  }, [])  
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
      
        <section className="min-vh-100 mb-4">
      <div>
        <div style={{background:"#1a2e47" ,  height:"80px"}}></div>
        <span className="mask bg-gradient-dark opacity-6"></span>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 text-center mx-auto">
              <h1 className="text-dark mb-2 mt-5">Welcome!</h1>
              <p className="text-dark mb-2 mt-5">Your account is set up Please click on the link below</p>
            </div>
          </div>
        </div>
      
      </div>
      <div className="card-body">
      <div className="mb-3">
                    <TextField type="password"  placeholder="Password" aria-label="Password" aria-describedby="email-addon" onChange={handleChange2}/>
     </div>
     <button className="btn bg-gradient-dark w-10 text-light my-4 mb-2" onClick={changePassword}>set Password</button><br></br><br></br>
      <button type="button" className="btn bg-gradient-dark text-light w-10 my-4 mb-2"  onClick={redirectToRestaurantResponsibleDashboard}>Confirm your account</button>
      </div>
      </section>
        
    )
}