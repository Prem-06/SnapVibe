import React from 'react'
import logo from "../image/instagram.png"
import './signup.css'
import { useEffect,useState } from 'react'
import {Link,useNavigate} from "react-router-dom"
import {toast } from 'react-toastify';
const Signup = () => {
  const [name,setname]=useState("");
  const [username,setusername]=useState("");
  const [password,setpassword]=useState("");
  const [email,setemail]=useState("");
   const navigate=useNavigate();
  const notifyA=(val)=> toast.error(val)
  const notifyB=(val)=> toast.success(val)
    const emailregex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
 function postdata(){
if(!emailregex.test(email)){
    notifyA("Invalid Email")
    return;
}
else if(!passwordregex.test(password)){
  notifyA("Password must contain atleast 8 characters,including atleast 1 numeric value, 1 lowercase(a-z),1 uppercase(A-Z) and 1 special character")
return
}
  fetch("http://localhost:5000/signup",{
    method:"post",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      name:name,email:email,username:username,password:password
    })
  }).then((res)=>{
   
    return res.json();
  }).then((val)=>{

    if(val.error){
      notifyA(val.error);
    }
    else{
      setname("");
      setemail("");
      setusername("");
      setpassword("");
      notifyB(val.message)
      navigate("/signin")
    }
  }).catch((err)=>{
    console.log(err)
  })
 }
  
  return (
    <div className='signup'>
    <div className='form-container'>
    <div className='form'>
    <img src={logo} className='signup-logo'/>
    <p className='loginpara'>Sign up to see photos and videos <br/> from your friends</p>
   <div>
   <input type='email' name='email' id='email' placeholder='Email' value={email} onChange={(e)=>{setemail(e.target.value)}}/>
   </div>
   <div>
   <input type='text' name='name' id='name' placeholder='Full name' value={name} onChange={(e)=>{setname(e.target.value)}}/>
   </div>
   <div>
   <input type='text' name='username' id='username' placeholder='Username' value={username} onChange={(e)=>{setusername(e.target.value)}}/>
   </div>
   <div>
   <input type='password' name='password' id='password' placeholder='Password' value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
   </div>
   <p className='loginpara' style={{fontSize:"12px",margin:"3px 0px"}}>
   By signing up,you agree to out terms,<br/>privacy policy and cookies policy.
   </p>
   <input type='submit' id='submit-btn' value="Sign Up" onClick={postdata}/>
    </div>
    <div className='form2'>
    Already have an account?
    <Link to="/signin"><span style={{color:"blue",cursor:"pointer"}}>Sign In</span></Link>
        
    </div>
    </div>
    </div>
  )
}

export default Signup