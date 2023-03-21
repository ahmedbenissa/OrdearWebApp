import { TextField } from "@material-ui/core";
import axios from "axios";
import MuiPhoneNumber from "material-ui-phone-number";
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import Navbar from "../../Components/NavbarComponent/NavBar";
import SideBar from "../../Components/SideBarComponent/SideBar";


export default function  EditProfileA()
{
    const [searchParams, setSearchParams] = useSearchParams();
    const  [user , setUser ]=useState({})
    const [value, setValue] = useState()
   const [address,setAddress]=useState("")
   const [userLogged,setUserLogged]=useState("")
   const [phone,setPhone]=useState("")
   const [password,setPassword]=useState("")
    useEffect(()=>{
        axios.get('/employees/view_profile/'+searchParams.get('q')).then((res)=>{
            // console.log(res)
             setUser(res.data[0])
         })
    },[user])
    const handleChange = event => {
        // event.preventDefault()
         console.log(event)
         // phone=event
          setValue(event)
          setPhone(event)
       }
       const handleChange5 = event => {
        // event.preventDefault()
         console.log(event.target.value)
          
          
          setPassword(event.target.value)
       }
       const handleChange4= event => {
      
         console.log(event.target.value)
      
          setAddress(event.target.value)
       }
       useEffect(()=>{ 
        const token = {
            token:localStorage.super_admin_token
        }  
        axios.post('/resp/auth_employee',token).then((res)=>{
            console.log(res)
            axios.get('/employees/view_profile/'+res.data[0].employee).then((res)=>{
                console.log(res)
                setUserLogged(res.data[0])
            })
        })
      
    },[])
       const EditProfile = e  =>{
        e.preventDefault()
            let  request_body={
                  phone:phone,
                  address:address
                 
            }
            console.log(request_body)
            axios.put("employees/edit_profile/"+user._id,request_body).then((res)=>{console.log(res)})
       }
    return (
        <div>
            <div className="wrapper">
          
            <div className="main-panel">
              <Navbar id={userLogged._id} image={userLogged.image} username={userLogged.username}  ></Navbar> 
              <SideBar username={userLogged.username}></SideBar>
            <div class="content">
        <div class="row">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">
                <h5 class="title">Edit Profile</h5>
              </div>
              <div class="card-body">
                <form>
            <div class="card-body p-4">
              <div class="row">
              <div class="col-md-5 pr-md-1">
                      <div class="form-group">
                    <TextField type="text" placeholder="address" aria-label="address" aria-describedby="address-addon" onChange={handleChange4}/>
                  </div>
                  </div>
                 
                  <div class="col-md-5 pl-md-1">
                      <div class="form-group">
                  <MuiPhoneNumber defaultCountry={'us'} onChange={handleChange}/></div></div>
                  <div class="form-check form-check-info text-left">
                    <input class="form-check-input" type="checkbox" value={value}  id="flexCheckDefault" checked/>

                    
                  </div>
                  
                   <button className="btn btn-secondary" onClick={EditProfile}>Edit Profile</button> 
                  </div>
                </div>
             </form>
            
              </div>
            </div>
            </div></div></div></div></div>
            
            </div>
         
    )
}