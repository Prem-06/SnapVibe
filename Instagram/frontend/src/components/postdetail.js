import React from 'react'
import './postdetail.css'
import {toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Postdetail = ({item,toogledetail}) => {
    const navigate=useNavigate();
    const notifyA=(val)=> toast.error(val)
    const notifyB=(val)=> toast.success(val)
    const removepost=(postid)=>{
       if(window.confirm("Are you sure want to delete this post?")){
        fetch(`http://localhost:5000/deletepost/${postid}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            }
        }).then((res)=>{
            return res.json()
        }).then((result)=>{
            notifyB(result.message)
            toogledetail();
            navigate('/')
        }).catch((err)=>{
           notifyA(err.error)
        })
       }
        
    }

  return (
    <div className="show-Comment">
  <div className="container">
    <div className="postPic">
     <img src={item.photo}alt="" />
    </div>
    <div className="details">
      <div className="card-header" style={{borderBottom:"1px solid #00000029"}}>
      <div className="card-pic">
    <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
    </div>
    <h5>{item.postedby.name}</h5>
    <div className="deletepost">
     <span className="material-symbols-outlined" onClick={()=>{removepost(item._id)}}>delete</span>
     </div>
      </div>
     

      {/* comment-section */}
<div className="commentsection" style={{borderBottom:"1px solid #00000029"}}>
  {
    item.comments.map((c,k)=>{
      return (
        <p className="comm">
        <span className="commenter" style={{fontWeight:"bolder"}}>{c.postedby.name} </span>
        <span className="commentText">{c.comment}</span>
        </p>
      )
    })
  }
  
</div>
  <div className="card-content">
   <p>{item.likes.length} Likes</p>
   <p>{item.body}</p>
  </div>
  {/*add-comment*/}
  <div className="add-comment">
   <span className="material-symbols-outlined">sentiment_satisfied</span>
   <input type="text" placeholder='Add a comment'  />
   <button className='comment'  >Post</button>
   </div>
    </div>
  </div>
  <div className="close-comment" onClick={()=>{toogledetail()}}><span class="material-symbols-outlined material-symbols-outlined-comment">close</span></div>
</div>
  )
}

export default Postdetail