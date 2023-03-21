import axios from "axios"
import { useEffect, useState } from "react"
import CreditCard from "../Components/CreditCard"
import ExampleNavBar from "../Components/ExampleNavBar"
import ExampleNavBarCustomer from "../Components/ExampleNavBarCustomer"
import SideBar from "../Components/SideBarCustomer"

export default function PaymentMethods()
{
    const [user,setUser]=useState({})
    console.log(localStorage)
    useEffect(()=>{
        const token = {
            token:localStorage.token
        }
        const Authorization = {
            auth:localStorage.token
        }
        let config = {
            headers: {
              'Authorization': 'Bearer ' + localStorage.token
            }
          }
        console.log(Authorization)
        axios.post('/customers/get_authentified_user',token).then((res)=>{
            console.log(res)
            axios.get('/customers/view_profile/'+res.data[0].user,config).then((res)=>{
                console.log(res) 
                setUser(res.data[0])
            })
        })
    },[])
    console.log(user)
    return (
        <div>
              <div className="main-panel">
             <ExampleNavBarCustomer id={user._id} image={user.image} username={user.username}  ></ExampleNavBarCustomer>
              <div class="container">  
     <div class="content">
<div class="row">
  <div class="col-md-8">
    <div class="card">
      <div class="card-header">
                <CreditCard email={user.email} name={user.username}></CreditCard>
              </div></div></div></div></div></div>
              </div>
        </div>
        
    )
}