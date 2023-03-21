import { useRef, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha"
export default function Captcha()
{
    const [captchaToken, setCaptchaToken] = useState(null);
const captchaRef = useRef(null);
const handleSubmit = (e) =>{
    e.preventDefault();
    const token = captchaRef.current.getValue();
    console.log(token)
    captchaRef.current.reset();
}
function onChange(value) {
    console.log("Captcha value:", value);
  }

return(
        <form onSubmit={handleSubmit} >
            <ReCAPTCHA 
       sitekey="6LfSXAglAAAAANMWqfh1yZ9QKNShMbK05BSZLXIj"
       
       ref={captchaRef}
       onChange={onChange} 
      />
        </form>
    )
}