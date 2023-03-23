const userModel = require("../Model/user.model");
const { hashPassword } = require("./user.controller");

const signup=async (req,res)=>{
    let {email,password} = req.body;
  
    // Hashing password with hashPassword function
    
    password=await hashPassword(password)

    try{
        const user=new userModel({email,password});
        await user.save()
        res.status(201).send({msg:`user registration successfull`,error:false,data:user})
    }catch(e){
        res.status(201).send({msg:e.message,error:true})
    }
}

module.exports=signup