import React from 'react'
import logo from "../image/instagram.png"
import './navbar.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Logincontext from '../context/logincontext'
const Navbar = (prop) => {
  const navigate=useNavigate();
  const {setmodalopen}=useContext(Logincontext);
const loginstatus=()=>{
  const token=localStorage.getItem('jwt');
   if(token || prop.login){
    return [
      <>
      <Link to="/profile"><li className='sign'>Profile</li></Link>
      <Link to="/createpost"><li className='sign'>Create Post</li></Link>
      <Link style={{marginLeft:"20px"}} to={"/myfollowingpost"}><li className='sign'>My Following Post</li> </Link>
      <Link to=""><li><button className='primaryBtn' onClick={()=>{setmodalopen(true)}}>Log Out</button></li></Link>
       
      </>
    ]
      
   }
   else{
    return [
      <>
      <Link to="/signup" ><li className='sign'>Sign Up</li></Link>
      <Link to="/signin" > <li className='sign'>Sign In</li></Link>
      </>
    ]
   }
}
const loginstatusmobile=()=>{
  const token=localStorage.getItem('jwt');
   if(token || prop.login){
    return [
      <>
      <Link to={'/'}><li><span class="material-symbols-outlined">home</span></li></Link>
      <Link to="/profile"><li><span class="material-symbols-outlined">account_circle</span></li></Link>
      <Link to="/createpost"><li><span class="material-symbols-outlined">add_circle</span></li></Link>
      <Link style={{marginLeft:"20px"}}to={"/myfollowingpost"}><li><span class="material-symbols-outlined">explore</span></li> </Link>
      <Link to=""><li  onClick={()=>{setmodalopen(true)}}><span class="material-symbols-outlined">logout</span></li></Link>
      </>
    ]
      
   }
   else{
    return [
      <>
      <Link to="/signup"><li>Sign Up</li></Link>
      <Link to="/signin"> <li>Sign In</li></Link>
      </>
    ]
   }
}

  return (
    <div className='navbar'>
    <img id='insta-logo' src={logo} alt='err' onClick={()=>{
      navigate('/')
    }}/>
    <ul className='nav-menu'> { loginstatus()}</ul>
    <ul className='nav-mobile'> { loginstatusmobile()}</ul>
    </div>
  )
}

export default Navbar