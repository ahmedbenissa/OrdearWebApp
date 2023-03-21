import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ExampleNavBar from "../Components/ExampleNavBar";
import ExampleNavBarCustomer from "../Components/ExampleNavBarCustomer";
import SideBarExample from "../Components/ExampleSideBar";
import NavBar from "../Components/NavBar";
import SideBar from "../Components/SideBar";

export default function ViewCustomerProfile()
{
  const [file,setimage]=useState("")
  const [img,setimg]=useState("")
  const  [user , setUser ]=useState({})
  const [searchParams, setSearchParams] = useSearchParams();
    useEffect(()=>{
    
      
         //  console.log(searchParams.get("q"))
         let config = {
          headers: {
            'Authorization': 'Bearer ' + localStorage.token
          }
        }
            axios.get('/customers/view_profile/'+searchParams.get('q'),config).then((res)=>{
               
                setUser(res.data[0])
            })

    },[user])  
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
          image:"http://localhost:8000/images/home/files/"+res.data.file.filename
        }
        axios.post("images/home/set_image_profile_customer/"+searchParams.get('q'),p).then((res)=>{console.log(res)})
        });
       
    }
    return (
        <div>
            <div className="wrapper">
            <SideBarExample username={user.username} ></SideBarExample>
            <div className="main-panel">
              <ExampleNavBarCustomer id={user._id} image={user.image} username={user.username}  ></ExampleNavBarCustomer> 
            <div className="content">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h5 className="title">View Profile</h5>
              </div>
              <div className="card-body">
                <div className="col-lg-14">
                  <div className="d-flex flex-column h-100">
                    <h5 className="font-weight-bolder">Full_Name:</h5><p className="mb-1 pt-2 text-bold">{user.username}</p>
                    <h5 className="font-weight-bolder">Email:</h5><p className="mb-1 pt-2 text-bold">{user.email}</p>
                    <h5 className="font-weight-bolder">address:</h5><p className="mb-1 pt-2 text-bold">{user.address}</p>
                    <h5 className="font-weight-bolder">Phone:</h5><p className="mb-1 pt-2 text-bold">{user.phone}</p>
                    <h5 className="font-weight-bolder">Image:</h5><p className="mb-1 pt-2 text-bold"><img src={user.image}></img></p>
                  
                    
                  </div>
                </div>
                <div className="col-lg-5 ms-auto text-center mt-5 mt-lg-0">
                

                </div>
                <input
          type="file"
          id="file"
          name="file"
          className="form-control"
          onChange={handleChange33}
        />
                    <button type="button" className="btn bg-gradient-dark w-100 my-2 mb-2"  onClick={upload}>upload</button>
              </div>
         </div></div></div></div></div></div></div>
        
    ) 
}