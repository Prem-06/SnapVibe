const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');
const USER=mongoose.model("USER");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const JWT_secret=require('../keys.js')
const requirelogin = require('../middlewares/requirelogin.js');

router.get('/',(req,res)=>{
    res.send("hello")
})

router.post('/signup',(req,res)=>{
      const {name,username,email,password}=req.body;
      if(!name || !email || !username || !password){
        return res.status(422).json({error:"Please fill all feilds"})
      }
      USER.findOne({$or:[{email:email},{username:username}]}).then((detail)=>{
        if(detail){
            return res.json({error:"User Already Registered"});
        }
        else{
            bcrypt.hash(password,5).then((hashpassword)=>{
                
                const user=new USER({name,email,username,password:hashpassword})
                user.save().then((user)=>{
                    res.status(200).json({message:"User Registered Succesfully"})
               }).catch((err)=>{
                  res.json({error:"404 Error Occur"})
               })
            })
        }
      }) 
})

router.post('/signin',(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(422).json({error:"Please fill all feilds"})
    }
    
    USER.findOne({email:email}).then((detail)=>{
        if(!detail){
        return res.status(422).json({error:"Invalid Email"})
        }

        bcrypt.compare(password,detail.password).then((val)=>{
            if(!val){
                return res.status(422).json({error:"Invalid Password"})
            }
            else{
                const token=jwt.sign({_id:detail.id},JWT_secret)
                // const {_id,name,email,username}=detail
                res.status(200).json({token,detail})
                // return res.status(200).json({message:"Signin Successfully"})
            }
        }).catch((err)=>{
            console.log(err);
        })
    })

})



module.exports=router;