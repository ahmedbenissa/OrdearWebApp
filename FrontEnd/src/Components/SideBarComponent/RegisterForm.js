import {MuiPhoneNumber} from "material-ui-phone-number"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FormControl } from '@mui/material';
import { FormHelperText, Input, InputLabel } from "@material-ui/core"
export default function RegisterForm(){
 return (
  <div>
    <FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
</FormControl>
  </div>
 )
}