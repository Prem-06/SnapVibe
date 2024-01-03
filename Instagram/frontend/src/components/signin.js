import React from 'react'
import './signin.css'
import { useState,useContext } from 'react'
import Logincontext from '../context/logincontext.js'
import logo from "../image/instagram.png"
import {Link,useNavigate} from "react-router-dom"
import {toast } from 'react-toastify';
const Signin = () => {
  const {setuserlogin}=useContext(Logincontext)
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const navigate=useNavigate();
  const notifyA=(val)=> toast.error(val)
  const notifyB=(val)=> toast.success(val)
  const emailregex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  function postdata(){
    if(!emailregex.test(email)){
        notifyA("Invalid Email")
        return;
    }
      fetch("http://localhost:5000/signin",{
        method:"post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
         email:email,password:password
        })
      }).then((res)=>{
        return res.json();
      }).then((val)=>{
        if(val.error){
          notifyA(val.error);
        }
        else{
          setemail("");
          setpassword("");
          localStorage.setItem("jwt",val.token)
          localStorage.setItem("detail",JSON.stringify(val.detail))
          notifyB("Sign In Successfully")
          setuserlogin(true);
          navigate("/")
        }
      }).catch((err)=>{
        console.log(err)
      })
     }

  return (
    <div className='signin'>
    <div>
    <div className='loginform'>
    <img src={logo} className='signup-logo'/>
    <div><input type='email' name='email' id='email' placeholder='Email' onChange={(e)=>{setemail(e.target.value)}}/></div>
    <div><input type='password' name='password' id='password' placeholder='password' onChange={(e)=>{setpassword(e.target.value)}}/></div>
    <input type='submit' value="Sign In" id='login-btn' onClick={postdata}/>
    </div>
    <div className='loginform2'>
          Don't have an account?
          <Link to="/signup"><span style={{color:"blue",cursor:"pointer"}}>Sign Up</span></Link>
    </div>
    </div>
    </div>
  )
}

export default Signin