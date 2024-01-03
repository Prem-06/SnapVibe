const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    followers:[{
        type:ObjectId,
        ref:"USER"}],
    following:[{
        type:ObjectId,
        ref:"USER"}],
    photo:{
        type:String
    }
})

mongoose.model("USER",userschema);

