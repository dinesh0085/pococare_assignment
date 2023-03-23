const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"please enter an email"],
        unique:true
    },
    password:{
       type:String,
       required:[true,"please enter an password"],
       minLength:[4,"minimum password length is 4 character"]
    }
},{timestamps:true})

const userModel=mongoose.model("user",userSchema)

module.exports=userModel