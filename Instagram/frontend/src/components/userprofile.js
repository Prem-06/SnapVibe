import React from 'react'
import './profile.css'
import { useEffect,useState } from 'react'
import Postdetail from './postdetail'
import {toast } from 'react-toastify';
import { useParams } from 'react-router-dom'
const Userprofile = () => {
  const piclink="https://cdn-icons-png.flaticon.com/128/552/552721.png";
  const notifyB=(val)=> toast.success(val)
const [user,setuser]=useState({})
const [post,setpost]=useState([])
const {userid}=useParams()
const [isfollow,setfollow]=useState(false)
const followuser=(userid)=>{
  fetch('http://localhost:5000/follow',{
    method:"put",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem('jwt')
    },
    body:JSON.stringify({
      followid:userid
    })
  }).then((result)=>{return result.json()}).then((val)=>{notifyB("Followed");setfollow(true)}).catch((err)=>{})
}
const unfollowuser=(userid)=>{
  fetch('http://localhost:5000/unfollow',{
    method:"put",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer "+localStorage.getItem('jwt')
    },
    body:JSON.stringify({
      followid:userid
    })
  }).then((result)=>{return result.json()}).then((val)=>{notifyB("Unfollowed");setfollow(false)}).catch((err)=>{})
}
useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await fetch(`http://localhost:5000/user/${userid}`);
      const val = await result.json();
      setpost(val.post);
      setuser(val.user);
      
      
      if (val.user.followers.includes(JSON.parse(localStorage.getItem('detail'))._id)) {
        setfollow(true);
      } else {
        setfollow(false);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  fetchData();
}, [isfollow]);

  return (
    <div className='profile'>
    {/*Profile frame */}
    <div className="profile-frame">
    {/*Profile pic */}
    <div className="profile-pic">
    <img src={user.photo?user.photo:piclink} alt="" />
    </div>
    {/*Profile-data */}
    <div className="profile-data">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <h1>{user.name}</h1>
      <button className='followbtn' onClick={()=> {
        if(isfollow){
          unfollowuser(user._id)
        }
        else{
          followuser(user._id)
        }
        }}>{isfollow?"Unfollow":"Follow"}</button>
      </div>
    
    <div className="profile-info" style={{display:'flex'}}>
    <p>{post.length} Posts</p>
    <p>{user.followers?user.followers.length:"0"} followers</p>
    <p>{user.following?user.following.length:"0"} following</p>
    </div>
    </div>
    </div>
<hr style={{width:"90%",margin:"25px auto",opacity:"0.8"}}/>
    {/*Gallery*/}
    <div className="gallery">
   {
    post.map((p,k)=>{
      return (
        <img src={p.photo} className='item' key={k} ></img>
      )
    })
   }
    </div>
{
//   show&&<Postdetail item={posts} toogledetail={toogledetail} />
}
  
    </div>
  )
}

export default Userprofile