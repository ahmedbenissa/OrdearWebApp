import { TextField } from "@material-ui/core";
import axios from "axios";
import MuiPhoneNumber from "material-ui-phone-number";
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import Navbar from "../../Components/NavbarComponent/NavBar";
import SideBar from "../../Components/SideBarComponent/SideBar";
import SideBarResOwner from "../../Components/SideBarComponent/SideBarResponible.js/SidebarResp";


export default function  EditProfile()
{
    const [searchParams, setSearchParams] = useSearchParams();
    const  [user , setUser ]=useState({})
    const [value, setValue] = useState()
   const [address,setAddress]=useState("")
   const [phone,setPhone]=useState("")
   const [role,setRole]=useState("")
   const [password,setPassword]=useState("")
    useEffect(()=>{
        axios.get('/employees/view_profile/'+searchParams.get('q')).then((res)=>{
            // console.log(res)
             setUser(res.data[0])
             axios.get('/employees/get_role/'+searchParams.get('q')).then((result)=>{
                console.log(result)
                setRole(result.data[0].post)})
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
              <Navbar id={user._id} image={user.image} username={user.username}  ></Navbar> 
              {(role=="super_admin")?(
                <SideBar username={user.username}></SideBar>
              ):(
                <SideBarResOwner username={user.username}></SideBarResOwner>
              )}
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