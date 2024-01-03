import React from 'react'
import './profile.css'
import { useEffect,useState } from 'react'
import Postdetail from './postdetail'
import Profilepic from './profilepic'
const Profile = () => {
  const piclink="https://cdn-icons-png.flaticon.com/128/552/552721.png";
const [pics,setpics]=useState([])
const [changepic,setchangepic]=useState(false)
const [show,setshow]=useState(false)
const [posts,setposts]=useState([])
const [user,setuser]=useState({})
const changeprofile=()=>{
if(changepic){
  setchangepic(false)
}
else{
  setchangepic(true)
}

}
const toogledetail=(post)=>{
  if(show){
    setshow(false)
  }
  else{
    setshow(true)
    setposts(post)
  }
}

  useEffect(()=>{
 fetch(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("detail"))._id}`,{
  headers:{
    "Authorization":"Bearer "+localStorage.getItem("jwt")
  }
 }).then((result)=>{
return result.json();
 }).then((val)=>{
  console.log(val)
  setpics(val.post)
  setuser(val.user)
 }).catch((err)=>{
  console.log(err)
 })
  },[])
  return (
    <div className='profile'>
    {/*Profile frame */}
    <div className="profile-frame">
    {/*Profile pic */}
    <div className="profile-pic">
    <img onClick={changeprofile} src={user.photo?user.photo:piclink} alt="" />
    </div>
    {/*Profile-data */}
    <div className="profile-data">
    <h1>{JSON.parse(localStorage.getItem("detail")).name}</h1>
    <div className="profile-info" style={{display:'flex'}}>
    <p>{pics?pics.length:"0"} Posts</p>
    <p>{user.followers?user.followers.length:"0"} Followers</p>
    <p>{user.following?user.following.length:"0"} Following</p>
    </div>
    </div>
    </div>
<hr style={{width:"90%",margin:"25px auto",opacity:"0.8"}}/>
    {/*Gallery*/}
    <div className="gallery">
   {
    pics.map((pic,k)=>{
      return (
        <img src={pic.photo} className='item' key={k} onClick={()=>{toogledetail(pic)}}></img>
      )
    })
   }
    </div>
{
  show&&<Postdetail item={posts} toogledetail={toogledetail} />
}
  {
    changepic&& <Profilepic changeprofile={changeprofile}/>
  }  

    </div>
  )
}

export default Profile