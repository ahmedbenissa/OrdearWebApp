import { useEffect, useState } from "react"
import {NavLink} from "react-router-dom"
import SideBar from "../SideBarComponent/SideBar"
import Table from "../TableComponent.js/TableComponent";
export default function Navbar(props){
      function openNav() {
        document.getElementById("mySidebar").style.width = "250px";
        document.getElementById("main").style.marginLeft = "100px";
      }
return (
    
    <div>
      <nav
        className="navbar navbar-expand-lg bg-red navbar-light sticky-top p-0 wow fadeIn"
        data-wow-delay="0.1s"
      >
       <img src="assetsTemplates/images/Logo.png"  style={{ marginLeft:"10px", width: "50px", height: "50px" }}></img>
          <h1 className="m-3 text-dark">
        
            Ordear
          </h1>
        
        <button className="openbtn" onClick={openNav} style={{marginLeft:"0px"}} >☰</button> 
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
      
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-1 p-lg-0">
          <li className="dropdown nav-item">
                <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                  <div className="photo">
                    <img src={props.image} style={{ width: "30px", height: "30px" }}  alt="Profile Photo"/>
                    
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block"></b>
                  <p className="d-lg-none">
                    Log out
                  </p>
                </a>
                
                <ul className="dropdown-menu dropdown-navbar">
                  <li className="nav-link"><a  className="nav-item dropdown-item" href={"/view_profile?q="+props.id}>View Profile</a></li>
                  <li className="nav-link"><a  className="nav-item dropdown-item" href={"/edit_profile?q="+props.id}>Edit Profile</a></li>
                  <li className="dropdown-divider"></li>
                  <li className="nav-link"><a className="nav-item dropdown-item" href="/sign_in">Log out</a></li>
                </ul>
               
              </li>
           
          
           </div></div></nav>
         
         </div>
            )
        }