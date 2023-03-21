import axios from "axios";
import MuiPhoneNumber from "material-ui-phone-number";
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import ExampleNavBar from "../Components/ExampleNavBar";
import ExampleNavBarCustomer from "../Components/ExampleNavBarCustomer";
import SideBarExample from "../Components/ExampleSideBar";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";

export default function  EditCustomerProfile()
{
    const [searchParams, setSearchParams] = useSearchParams();
    const  [user , setUser ]=useState({})
    const [value, setValue] = useState()
   const [address,setAddress]=useState("")
   const [phone,setPhone]=useState("")
   const [password,setPassword]=useState("")
    useEffect(()=>{
      let config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }
        axios.get('/customers/view_profile/'+searchParams.get('q'),config).then((res)=>{
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
       const EditProfile = e  =>{
        e.preventDefault()
            let  request_body={
                  phone:phone,
                  address:address,
                  password:password
            }
            let config = {
              headers: {
                'Authorization': 'Bearer ' + localStorage.token
              }
            }
            console.log(request_body)
            axios.put("customers/edit_profile/"+user._id,request_body,config).then((res)=>{console.log(res)})
       }
    return (
        <div>
            <div className="wrapper">
            <SideBarExample></SideBarExample>
            <div className="main-panel">
              <ExampleNavBarCustomer id={user._id} image={user.image} username={user.username}  ></ExampleNavBarCustomer> 
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
                    <input type="text" class="form-control" placeholder="address" aria-label="address" aria-describedby="address-addon" onChange={handleChange4}/>
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