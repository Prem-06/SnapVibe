const mongoose=require('mongoose');
const express=require('express')
const router=express.Router();
const POST=mongoose.model('POST')
const requirelogin=require("../middlewares/requirelogin")

router.get('/allpost',(req,res)=>{
    POST.find().populate("postedby").populate("comments.postedby").sort("-createdAt").then((posts)=>{
      return res.status(200).json(posts);
    }).catch(()=>{
        return res.status(422).json(({error:"Error occur"}))
    })
})

router.post('/createpost',requirelogin, (req,res)=>{
    const {photo,body}=req.body;
    if(!photo || !body){
        return res.status(422).json({error:"Please Fill All feilds"})
    }
   
   const post=new POST({
    photo:photo,body:body,postedby:req.value
   })
   post.save().then((result)=>{
    return res.json({post:result})
   }).catch((err)=>{
    res.json(err)
   })
})

router.get('/mypost',requirelogin,(req,res)=>{
    POST.find({postedby:req.value._id}).populate("postedby").populate("comments.postedby","_id name").sort("-createdAt").then((result)=>{
         res.status(200).json(result)
    }).catch((err)=>{
         res.status(422).json({error:"Can't get post"})
    })
})

router.put('/like',requirelogin,(req,res)=>{
    POST.findByIdAndUpdate(req.body.postid,{$push:{likes:req.value._id}},{new:true}).populate("postedby").populate("comments.postedby").then((result)=>{
            return res.status(200).json(result);
  }).catch((err)=>{
    return res.json({error:"Error"})
  })
})
router.put('/unlike',requirelogin,(req,res)=>{
    POST.findByIdAndUpdate(req.body.postid,{$pull:{likes:req.value._id}},{new:true}).populate("postedby").populate("comments.postedby").then((result)=>{
            return res.status(200).json(result);
  }).catch((err)=>{
    return res.json({error:"Error"})
  })
})

router.put('/comment',requirelogin,(req,res)=>{
  let mess={
    comment:req.body.text,
    postedby:req.value._id
  }
  POST.findByIdAndUpdate(req.body.postid,{$push:{comments:mess}},{new:true}).populate("postedby").populate("comments.postedby").then((result)=>{
    return res.status(200).json(result);
}).catch((err)=>{
return res.json({error:"Error"})
})
})

router.delete('/deletepost/:postid',requirelogin,(req,res)=>{
  POST.findOne({_id:req.params.postid}).populate("postedby","_id").populate("comments.postedby").then((result)=>{
   if(!result){
    res.status(404).json({error:"Post not found!!!"})
   }
   else{
  
    if(result.postedby._id.toString()==req.value._id.toString()){
      POST.deleteOne({_id:req.params.postid}).then((result)=>{
       return res.json({message:"post deleted"})
      }).catch((err)=>{
        res.json({error:"error occur"})
      })
    }
   }
  }).catch((error)=>{console.log(error)})
})

module.exports=router