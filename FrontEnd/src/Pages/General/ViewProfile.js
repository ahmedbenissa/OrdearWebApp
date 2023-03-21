import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../Components/NavbarComponent/NavBar";
import SideBar from "../../Components/SideBarComponent/SideBar";
import SideBarResOwner from "../../Components/SideBarComponent/SideBarResponible.js/SidebarResp";



export default function ViewProfile()
{
  const [file,setimage]=useState("")
  const [img,setimg]=useState("")
  const  [user , setUser ]=useState({})
  const [role,setRole]=useState("")
  const [searchParams, setSearchParams] = useSearchParams();
    useEffect(()=>{
    
      
         //  console.log(searchParams.get("q"))
           
            axios.get('/employees/view_profile/'+searchParams.get('q')).then((res)=>{
                console.log(res)
                setUser(res.data[0])
                axios.get('/employees/get_role/'+searchParams.get('q')).then((result)=>{
                    console.log(result)
                    setRole(result.data[0].post)
                    
                })
            })

    },[])  
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
      
        // Details of the uploaded file
        console.log(file.file);
    //    axios.post("http://localhost:8086/products/save",Product).then((res)=>{console.log(res)})
        axios.post("images/home/upload", formData).then((res)=>
        {console.log(res)
        const p = {
          "image":"http://localhost:8000/images/home/files/"+res.data.file.filename
        }
        axios.post("images/home/set_image_profile/"+searchParams.get('q'),p).then((res)=>{console.log(res)})
        });
       
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
                <h5 class="title">View Profile</h5>
              </div>
              <div class="card-body">
                <div class="col-lg-14">
                  <div class="d-flex flex-column h-100">
                    <h5 class="font-weight-bolder text-dark">Full_Name:</h5><p class="mb-1 pt-2 text-bold text-dark">{user.username}</p>
                    <h5 class="font-weight-bolder text-dark">Email:</h5><p class="mb-1 pt-2 text-bold text-dark">{user.email}</p>
                    <h5 class="font-weight-bolder text-dark">address:</h5><p class="mb-1 pt-2 text-bold text-dark">{user.address}</p>
                    <h5 class="font-weight-bolder text-dark">Phone:</h5><p class="mb-1 pt-2 text-bold text-dark">{user.phone}</p>
                    <h5 class="font-weight-bolder ">Image:</h5><p class="mb-1 pt-2 text-bold"><img style={{width:"20px",height:"20px"}} src={user.image}></img></p>
                  
                    
                  </div>
                </div>
                <div class="col-lg-5 ms-auto text-center mt-5 mt-lg-0">
                

                </div>
                <input
          type="file"
          id="file"
          name="file"
          className="form-control"
          onChange={handleChange33}
        />
                    <button type="button" class="btn bg-gradient-dark w-50 my-4 mb-2"  onClick={upload}>upload</button>
              </div>
         </div></div></div></div></div></div></div>
        
    ) 
}