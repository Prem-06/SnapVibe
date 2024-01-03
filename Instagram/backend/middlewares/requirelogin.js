const jwt=require('jsonwebtoken')
const JWT_secret=require('../keys.js')
const mongoose=require('mongoose')
const user=mongoose.model('USER')

module.exports=(req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization){
        return res.status(401).json({error:"You must Sign In before"})
    }
   const token=authorization.replace("Bearer ","")
   jwt.verify(token,JWT_secret,(err,payload)=>{
    
     if(err){
        res.status(401).json({error:"Error Occur"})
     }
     const {_id}=payload;
     user.findById(_id).then((userdata)=>{
       req.value=userdata
       next();
     })
   })
    
}