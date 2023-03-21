import './sidebar.css'
export default function SideBar(props)
{
    
      
      function closeNav(event) {
        event.preventDefault()
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
      }
    return(
       <div id="main">
        
        <aside class="sidebar" id="mySidebar" >
        <a href="" className="closebtn" onClick={closeNav}>×</a>
        <div class="sidenav-header">
          <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
         
        </div>
        <p className="text-secondary px-3"> Welcome  {props.username} !</p>
        <div class="horizontal light mt-0">
        <div  id="sidenav-collapse-main">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link  active" href="/super_admin_dash">
                <span class="nav-link-text text-light ms-1">Super Admin Dashboard</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link  " href="/register_rr">
                <span class="nav-link-text text-light ms-1">Restaurant owners Management</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link  " href={"/"+props.link_1}>
                <span class="nav-link-text text-light ms-1">Franchise owners Management</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link  " href={"/"+props.link_2}>
              
                <span class="nav-link-text text-light ms-1">Executors Management</span>
              </a>
            </li>        
            <li class="nav-item">
              <a class="nav-link  " href={"/"+props.link_2}>
              
                <span class="nav-link-text text-light ms-1">Posts Management</span>
              </a>
            </li>        
           
         
          </ul>
        </div>
     
       </div>
      </aside></div>
    )
}