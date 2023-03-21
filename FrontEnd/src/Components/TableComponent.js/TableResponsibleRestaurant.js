import MUIDataTable from "react-datatable-mui";
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import axios from "axios"
import { useEffect, useState } from "react";
import { height } from "@mui/system";

export default function TableResponsibleRestaurant(props)
{
  const columns = ["Full_name", "email", "address","phone","image","Post occupied"];
  const [table,setTable]=useState([])
  let r=props.restaurant
  console.log(r)
  useEffect(()=>{
    
    axios.get('employees/list/'+r).then((res)=>{
      console.log(res)
      
      
      console.log(res.data.map(e=>[e._id,e.username,e.email,e.address,e.phone,e.image]))
       setTable(res.data.map(e=>[e.username,e.email,e.address,e.phone,<img style={{width:"50px",height:"50px"}} src={e.image}></img>,e.role[0].post,<i className="fa fa-pencil"><p>edit</p></i>]))
    })
  },[])
 

 
const options = {
  filterType: 'checkbox',
};
console.log(table)
   return (
    <div style={{width:"75%",marginLeft:"350px" ,height:"100%" }}>
      
        <MUIDataTable 
  data={table}
  columns={columns}
  options={options}
/>
    </div>
   )
}