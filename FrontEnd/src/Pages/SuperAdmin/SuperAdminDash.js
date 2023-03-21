import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../Components/NavbarComponent/NavBar";
import SideBar from "../../Components/SideBarComponent/SideBar";
import Table from "../../Components/TableComponent.js/TableComponent";

export default function SuperAdminDashboard(){
    const [user,setUser]=useState("")
    useEffect(()=>{
        const token = {
            token:localStorage.super_admin_token
        }

        axios.post('/resp/auth_employee',token).then((res)=>{
            console.log(res)
            axios.get('/employees/view_profile/'+res.data[0].employee).then((res)=>{
                console.log(res)
                setUser(res.data[0])
            })
        })
      
    },[])
    console.log(user)
    return (
        <div>
            <Navbar  username={user.username} image={user.image} id={user._id}></Navbar><br></br><br></br><br></br>
            <SideBar username={user.username} ></SideBar>
            <a href="/add_user"><button className="btn btn-danger">add User</button></a>
           
            <Table></Table>
        </div>
    )
}