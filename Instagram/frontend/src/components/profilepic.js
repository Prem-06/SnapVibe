import React,{useEffect,useState,useRef} from 'react'
import './modal.css'
const Profilepic = ({changeprofile}) => {
  const piclink="https://cdn-icons-png.flaticon.com/128/552/552721.png";
    const hiddenfileinput=useRef(null)
    const [image,setimage]=useState(null)
    const [url,seturl]=useState(null)
const handleclick=()=>{
hiddenfileinput.current.click()
}
function postdetail(){
    const data=new FormData()
    data.append("file",image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","premprakashpal")
    fetch('https://api.cloudinary.com/v1_1/premprakashpal/image/upload',{
      method:"post",
      body:data
    }).then((res)=>{
      return res.json();
    }).then((val)=>{
        console.log(val.url)
      seturl(val.url)
    }).catch((err)=>{
      console.log("error occur1");
    })
    }
    useEffect(()=>{
        if(image){
            postdetail()
        }
      },[image])

      const postpic=()=>{
              fetch("http://localhost:5000/uploadprofilepic",{
            method:"put",
            headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
              photo:url
            })
          }).then((res)=>{
            return res.json();
          }).then((data)=>{
            changeprofile()
           window.location.reload();
          }).catch((err)=>{
            console.log(err)
          })
      }

      useEffect(()=>{
        if(url){
            postpic();
        }
      },[url])
  return (
    <div className='profilepic darkbg'>
     <div className="changepic centered">
        <div>
            <h2>Change Profile Photo</h2>
        </div>
        <div style={{borderTop:"1px solid #00000060"}}>
            <button className="upload-btn" style={{color:"#1EA1F7"}} onClick={handleclick}>Upload Photo</button>
            <input type="file"accept='image/*' style={{display:"none"}} ref={hiddenfileinput} onChange={(e)=>{setimage(e.target.files[0])}}/>
        </div>
        <div style={{borderTop:"1px solid #00000060"}}>
            <button className='upload-btn' style={{color:"#ED4956"}} onClick={()=>{seturl(null);postpic()}}>Remove Photo</button>
        </div>
        <div style={{borderTop:"1px solid #00000060"}}>
            <button style={{background:"none",border:"none",cursor:"pointer",fontSize:"15px"}} onClick={changeprofile}>Cancel</button>
        </div>
     </div>
    </div>
  )
}

export default Profilepic