const mongoose=require('mongoose');
const express=require('express')
const router=express.Router();
const POST=mongoose.model('POST')
const USER=mongoose.model('USER')
const requirelogin=require("../middlewares/requirelogin")

router.get('/user/:id',(req,res)=>{
    USER.findOne({_id:req.params.id}).select("-password").then((user)=>{
        POST.find({postedby:req.params.id}).populate("postedby").then((post)=>{res.status(200).json({user,post})}).catch((err)=>{return res.json(err)})
    }).catch((err)=>{
        res.json(err)
    })
})

router.put('/follow', requirelogin, (req, res) => {
    USER.findByIdAndUpdate(
      req.body.followid,
      { $push: { followers: req.value._id } },
      { new: true }
    )
      .then((result) => { })
      .catch((err) => {
        
      });
      USER.findByIdAndUpdate(
        req.value._id,
        { $push: { following: req.body.followid } },
        { new: true }
      )
        .then(() => {
          res.status(200).json({ message: 'following' });
        })
        .catch((err) => {
          res.status(422).json({ error: 'error1', details: err });
        });
  });
  

  router.put('/unfollow', requirelogin, (req, res) => {
    USER.findByIdAndUpdate(
      req.body.followid,
      { $pull: { followers: req.value._id } },
      { new: true }
    )
      .then((result) => {
       
      })
      .catch((err) => {
        
      });

      USER.findByIdAndUpdate(
        req.value._id,
        { $pull: { following: req.body.followid } },
        { new: true }
      )
        .then(() => {
          res.status(200).json({ message: 'unfollowing' });
        })
        .catch((err) => {
          res.status(422).json(err);
        });

  });
  router.get("/myfollowingpost",requirelogin,(req,res)=>{
    POST.find({postedby:{$in:req.value.following}}).populate("postedby").populate('comments.postedby').then((result)=>{
      return res.status(200).json(result);
    }).catch((err)=>{
      res.json(err)
    })
  })

  router.put('/uploadprofilepic',requirelogin,(req,res)=>{
   
    USER.findByIdAndUpdate(req.value._id,{$set:{photo:req.body.photo}},{new:true}).then((result)=>{
     return res.status(200).json(result)
    }).catch((err)=>{
      console.log(err)
    })
  })
module.exports=router;