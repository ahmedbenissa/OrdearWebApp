import MUIDataTable from "react-datatable-mui";
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import axios from "axios"
import { useEffect, useState } from "react";
import { height } from "@mui/system";

export default function Table()
{
  const columns = ["Full_name", "email", "address","phone","image","Post occupied","Edit","View"];
  const [table,setTable]=useState([])
  useEffect(()=>{
    
    axios.get('/resp/list_users').then(async (res)=>{
      console.log(res)
      
      
      console.log(res.data.map(e=>[e._id,e.username,e.email,e.address,e.phone,e.image]))
       setTable(res.data.map(e=>[e.username,e.email,e.address,e.phone,<img style={{width:"50px",height:"50px"}} src={e.image}></img>,e.role[0].post,<a href={"/edit_profile_for_admin?q="+e._id}><i class="fa fa-pencil" style={{color:"green"}}></i></a>,
      <a href={'/view_profile_for_admin?q='+e._id}> <i style={{color:"orange"}}class="fa fa-eye"></i></a>]))
    })
  },[])
 
console.log(table)

const options = {
      filterType: 'checkbox',
      rowsPerPage:[3],
      rowsPerPageOptions:[1,3,5,6,table.length],
      jumpToPage: true,
      textLabels:{
        pagination: {
          next: "Next >",
          previous: "< Previous",
          rowsPerPage: "Total items Per Page",
          displayRows: "OF"
        }
      }
    
      
};
   return (
    <div style={{width:"75%",marginLeft:"350px" ,height:"100%" , backgroundColor:"blue"}}>
      
        <MUIDataTable 
  data={table}
  columns={columns}
  options={options}
  
/>
    </div>
   )
}