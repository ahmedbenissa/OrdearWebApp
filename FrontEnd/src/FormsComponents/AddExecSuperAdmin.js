import axios from "axios"

import { useState,useEffect } from "react"

import MuiPhoneNumber from 'material-ui-phone-number';

import { FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import TableResponsibleRestaurant from "../Components/TableComponent.js/TableResponsibleRestaurant";



export default function RegisterExecutorSuperAdmin(props)
{
  const [User,setUser]=useState({"username":"","email":"","password":"","address":"","phone":"","image":"","role":"","restaurant":""})
  const [file,setimage]=useState("")
  const [img,setimg]=useState("")
  const [fn, setfn] = useState("")
  const [list,setList]=useState([])
  const [list2,setList2]=useState([])
  const [value, setValue] = useState()
  const [id,setId]=useState(0)
  const [roles,SetRoles]=useState([])
useEffect(()=>{ axios.get("restaurant/retrieve_restaurants").then((res)=>{
  console.log(res.data)
  setList(res.data)
})},[])

 console.log(props)
    const handleChange33 = event => {
      event.preventDefault()
        setimage({file:event.target.files[0]})   
    }
    const upload = e => {
      console.log("aaaaaa")
      e.preventDefault()
      const formData = new FormData();
      formData.append(
          "file",
          file.file
        );
      
    
        console.log(file.file);
        axios.post("images/home/upload", formData).then((res)=>
        {console.log(res)
        const p = {
          "image":"http://localhost:8000/images/home/files/"+res.data.file.filename
        }
        console.log(id)
        axios.post("images/home/set_image_profile/"+id,p).then((res)=>{console.log(res)})
        });
       
    }
    const Confirm = event => {
        if(User.email==""||User.username==""||User.phone==""||User.restaurant=="" || User.role=="")
  {
    alert("complete the form")
  }
        console.log(User)
        let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let passwordLength = 12;
        var password = "";
        for (var i = 0; i <= passwordLength; i++) {
          var randomNumber = Math.floor(Math.random() * chars.length);
          password += chars.substring(randomNumber, randomNumber +1);
         }
      
         const user={
          username:User.username,
          email:User.email,
          password:password,
          phone:User.phone,
          address:User.address,
          image:"",
          role:User.role,
          restaurant:User.restaurant
         }
         console.log(user)
        axios.post('employees/add_employee',user).then((res)=>{
          const pass= {
            password:user.password
          }
          const text = {
            text : 'email : '+User.email+'...'+' password : '+pass.password
          }
          console.log(pass)
          console.log(res.data)
          if(res.status==200)
          {
            alert (" Employee has been added ")
            axios.post('mail/send_mail/'+User.email+'/credentials',text).then((res)=>{
              console.log(res)
            })
          }
          setId(res.data._id) 
       })
      }
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
         User.role=event.target.value
          
          
           setUser(User)
        }
        const handleChange6= event => {
            // event.preventDefault()
            console.log(event.target.value)
            User.restaurant=event.target.value
             
             
              setUser(User)
           }
useEffect(()=>{ axios.get("posts/get_posts").then((res)=>{
  console.log(res.data)
 let x=  res.data.filter(e=>e.post!='responsible_restaurant').filter(e=>e.post!='Responsible_Franchise').filter(e=>e.post!="super-admin")
 console.log(x)
  SetRoles(x)
})},[])
useEffect(()=>{ axios.get("restaurant/retrieve_restaurants").then((res)=>{
  console.log(res.data)
  setList2(res.data)
})},[])

    return (

        <div className="main-panel">
          
      <div class="content">
  <div class="row">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">
                <form role="form text-left">
                  <h1>add executor</h1>
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
                  <p for="roles" className="text-dark">Choose a role</p>
                   
                    <Select
                       id="roles"
                       label="choose role"
                        onChange={handleChange5}
                        value={User.role}
                    >
                           {
                           roles.map((e)=>
                             <MenuItem value={e._id} key={e._id} >{e.post + " " + e._id}</MenuItem>
                           )
                           }
                    </Select>
                    <p for="restaurants" className="text-dark">Choose a restaurant</p>
                    <Select
                       id="restaurants"
                       label="choose Restaurant"
                        onChange={handleChange6}
                        value={User.restaurant}
                    >
                           {
                           list.map((e)=>
                             <MenuItem value={e._id} key={e._id} >{e.restaurant_name + " " + e.restaurant_address}</MenuItem>
                           )
                           }
                    </Select>
                    <input
          type="file"
          id="file"
          name="file"
          className="form-control"
          onChange={handleChange33}
        />
                    <button type="button" class="btn bg-gradient-dark w-100 my-4 mb-2"  onClick={upload}>upload</button>
                  <div class="text-center">
                    <button type="button" class="btn bg-gradient-dark w-12 my-4 mb-2 text-light"  onClick={Confirm}>Add Executors</button>
                  </div>
              
                </form></div></div></div></div></div></div>
            
         
    )
}