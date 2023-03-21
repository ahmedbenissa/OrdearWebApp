import axios from "axios"

import { useState,useEffect } from "react"

import MuiPhoneNumber from 'material-ui-phone-number';
import SideBar from "../Components/SideBarComponent/SideBar";
import NavBar from "../Components/NavbarComponent/NavBar";
import { FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import TableResponsibleRestaurant from "../Components/TableComponent.js/TableResponsibleRestaurant";
import AddExecutor from "../Pages/Responsibles/AddExecutor";



export default function AddResponsibleRestaurant()
{
  const [User,setUser]=useState({"username":"","email":"","password":"","address":"","phone":"","image":"","restaurant":""})
  const [list,setList]=useState([])
  const [value, setValue] = useState()
  const [fn, setfn] = useState("")
  const [street,setStreet]=useState("")
  const [city,setcity]=useState("")
  const [region,setRegion]=useState("")
  const [country,setcountry]=useState("")
useEffect(()=>{ axios.get("restaurant/retrieve_restaurants").then((res)=>{
  console.log(res.data)
  setList(res.data)
})},[])
const  [userlogged , setUserlogged ]=useState({})
    useEffect(()=>{
        const token = {
            token:localStorage.super_admin_token
        }
        axios.post('/resp/auth_employee',token).then((res)=>{
            console.log(res)
            axios.get('/employees/view_profile/'+res.data[0].employee).then((res)=>{
                console.log(res)
                setUserlogged(res.data[0])
            })
        })
      
    },[])  
const handleChange = event => {
 // event.preventDefault()
  console.log(event)
   User.phone=event
}
const handleChange0 = event => {
  // event.preventDefault()
   console.log(event)
    setfn(event.target.value)
 }
const handleChange1 = event => {
  // event.preventDefault()
   console.log(event.target.value)
    User.username=fn + "   " + event.target.value
    console.log(User.username)
    setUser(User)
 }
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
 const handleChange4= event => {
  // event.preventDefault()
   console.log(event.target.value)
    User.address=event.target.value
    setUser(User)
 }
 const handleChange5= event => {
  // event.preventDefault()
  console.log(event.target.value)
  User.restaurant=event.target.value
   
   
    setUser(User)
 }
 const Confirm = event => {
  console.log(User)
  if(User.email==""||User.username==""||User.phone==""||User.restaurant=="")
  {
    alert("complete the form")
  }
   const user={
    username:User.username,
    email:User.email,
    password:"123456",
    phone:User.phone,
    address:User.address,
    image:"",
    restaurant:User.restaurant
   }
  axios.post('resp/add_restaurant_responsible',user).then((res)=>{
    const pass= {
      password:user.password
    }
    console.log(pass)
    axios.post('mail/validateResp/'+user.email+'/validation',pass).then((res)=>{console.log(res)
     })
    console.log(res)
 
  })
 //   var login_link_for_restaurant_owner = ""
  
 }
    console.log(User)
    console.log(list)
    return (

      <div className="wrapper">
    
      <SideBar username={userlogged.username} ></SideBar>
      <div className="main-panel">
        <NavBar id={userlogged._id} image={userlogged.image} username={userlogged.username}  ></NavBar> 
      <div class="content">
  <div class="row">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">
                <form role="form text-left">
                  <h1>add restaurant_owner</h1>
                  <div class="mb-3">
                  <FormControl>
                     <InputLabel htmlFor="my-input">First Name</InputLabel>
                      <TextField required id="my-input" onChange={handleChange0} placeholder="First name"  aria-describedby="my-helper-text" />
                   </FormControl>
                  <FormControl>
                     <InputLabel htmlFor="my-input">Last Name</InputLabel>
                      <TextField  required id="my-input" onChange={handleChange1} placeholder="Last name"  aria-describedby="my-helper-text" />
                  
                   </FormControl>
                 
                  </div>
                  <div class="mb-3">
                  <FormControl>
                     <InputLabel htmlFor="my-input">Email</InputLabel>
                      <TextField required id="my-input" type="email"  onChange={handleChange2} placeholder="Email"  aria-describedby="my-helper-text" />
                  
                   </FormControl>
                   
                  </div>
                 
                  <div class="mb-3">
                  <FormControl>
                     <InputLabel htmlFor="my-input">address</InputLabel>
                      <TextField required id="my-input" type="address"  onChange={handleChange4} placeholder="address"  aria-describedby="my-helper-text" />
                   </FormControl>

                  </div>
                 
                  <MuiPhoneNumber defaultCountry={'us'} onChange={handleChange}/>
                  <div class="form-check form-check-info text-left">
                    <input class="form-check-input" type="checkbox" value={value}  id="flexCheckDefault" checked/>

                    <label class="form-check-label" for="flexCheckDefault">
                      I agree the <a  class="text-dark font-weight-bolder">Terms and Conditions</a>
                    </label>
                  </div>
                  <label for="cars">Choose a restaurant:</label>
                   
                    <Select
                       id="restaurants"
                       label="choose Restaurant"
                        onChange={handleChange5}
                        value={User.restaurant}
                    >
                           {
                           list.map((e)=>
                             <MenuItem value={e._id} key={e._id} >{e.restaurant_name + " " + e.restaurant_address}</MenuItem>
                           )
                           }
                    </Select>
                  <div class="text-center">
                    <button type="button" class="btn bg-gradient-dark w-12 my-4 mb-2 text-light"  onClick={Confirm}>Add Restaurant Owner</button>
                  </div>
              
                </form>
              
              </div></div></div></div></div></div></div>
         
    )
}