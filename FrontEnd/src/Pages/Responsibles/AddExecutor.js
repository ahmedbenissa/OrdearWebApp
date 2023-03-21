import axios from "axios"
import { useEffect, useState } from "react"
import Navbar from "../../Components/NavbarComponent/NavBar"
import SideBarResOwner from "../../Components/SideBarComponent/SideBarResponible.js/SidebarResp"

import RegisterExecutor from "../../FormsComponents/RegisterExecutor"
import MUIDataTable from "react-datatable-mui";

export default function AddExecutor()
{
    const  [user , setUser ]=useState({"username":"","email":"","password":"","address":"","phone":"","image":"","restaurant":"","franchise":""})
  const [list , SetList]=useState([])
  const [roles,setRoles]=useState([])
  const [table,setTable]=useState([])
  const columns = ["Full_name", "email", "address","phone","image","Post occupied","Edit","View"];
  const options = {
    filterType: 'checkbox',
  };
    useEffect(()=>{
        const token = {
            token:localStorage.restaurant_responsible_token
        }
       
        axios.post('/resp/auth_employee',token).then( async (res)=>{
            console.log(res)
             axios.get('/employees/view_profile/'+res.data[0].employee).then(async (res1)=>{
                console.log(res1)
                axios.get('employees/list/'+res1.data[0].restaurant).then((res)=>{
                    console.log(res)
                    
                    
                    console.log(res.data.map(e=>[e._id,e.username,e.email,e.address,e.phone,e.image]))
                     setTable(res.data.map(e=>[e.username,e.email,e.address,e.phone,<img style={{width:"50px",height:"50px"}} src={e.image}></img>,e.role[0].post
                    ,<i class="fa fa-pencil"></i>,
                    <i class="fa fa-eye"></i>]))
                  })
                setUser(res1.data[0])
                   
                   axios.get('/posts/get_posts').then((response)=>{
                         console.log(response)
                        setRoles(response.data)
                    })
            }
            )
         

        })},[])
        useEffect(()=>{
    
   
          },[])
        console.log(user.restaurant)
     return(
        <div>
            <div className="wrapper">
   
   <SideBarResOwner  username={user.username} ></SideBarResOwner>
   <Navbar username={user.username} image={user.image} id={user._id}></Navbar>
   <div className="main-panel">
 
   <RegisterExecutor restaurant={user.restaurant} ></RegisterExecutor>
   </div>
           
   

   </div>
  
            <div className="main-panel">
          
            </div>
            
        </div>
     )
}