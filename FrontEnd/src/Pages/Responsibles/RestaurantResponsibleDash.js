import { Restaurant } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../Components/NavbarComponent/NavBar";
import SideBarResOwner from "../../Components/SideBarComponent/SideBarResponible.js/SidebarResp";
import TableResponsibleRestaurant from "../../Components/TableComponent.js/TableResponsibleRestaurant";
import MUIDataTable from "react-datatable-mui";

export default function RestaurantownerDashboard()
{
    const options = {
        filterType: 'checkbox',
      };    
      const columns = ["Full_name", "email", "address","phone","image","Post occupied","Edit","View"];

  const  [user , setUser ]=useState({"username":"","email":"","password":"","address":"","phone":"","image":"","restaurant":"","franchise":""})
  const [list , SetList]=useState([])
  const [roles,setRoles]=useState([])
  const [table,setTable]=useState([])
    useEffect(()=>{
        const token = {
            token:localStorage.restaurant_responsible_token
        }
       
        axios.post('/resp/auth_employee',token).then( async (res)=>{
            console.log(res)
             axios.get('/employees/view_profile/'+res.data[0].employee).then(async (res)=>{
                console.log(res)
                
                setUser(res.data[0])
                axios.get('/employees/list/'+res.data[0].restaurant).then((res)=>
                {console.log(res)
                     
                    SetList(res.data)
                    console.log(res.data.map(e=>[e._id,e.username,e.email,e.address,e.phone,e.image]))
                    setTable(res.data.map(e=>[e.username,e.email,e.address,e.phone,<img style={{width:"50px",height:"50px"}} src={e.image}></img>,e.role[0].post,<i class="fa fa-pencil" style={{color:"green"}}></i>,
                    <i class="fa fa-eye" style={{color:"orange"}} ></i>]))
                })
                   axios.get('/posts/get_posts').then((response)=>{
                         console.log(response)
                        setRoles(response.data)
                    })
            }
            )
         

        })},[])
     return(
        <div>
              <Navbar username={user.username} image={user.image} id={user._id}></Navbar>
              <SideBarResOwner  username={user.username} ></SideBarResOwner>
             <a href="/add_executor"> <i className="fa fa-plus" style={{color:"red"}}></i></a>
              <div style={{width:"75%",marginLeft:"350px" ,height:"100%" }}>
      
      <MUIDataTable 
data={table}
columns={columns}
options={options}
/>
  </div></div>
     )
}