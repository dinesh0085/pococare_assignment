const userModel = require("../Model/user.model");
const { generateToken, comparePassword, generateRefreshToken } = require("./user.controller");


const login=async (req,res)=>{
     const {email,password} = req.body;
    
    const user=await userModel.findOne({email});
    try{
     if(user){

        // comparing input password with database password 
      const comparePasswordWithDb=await comparePassword(password,user.password)

      if(comparePasswordWithDb){
        // json web token generation with user id
        const jwt_token=await generateToken(user._id)
        const jwt_refresh_token=await generateRefreshToken(user._id)
        // set cookies to jwt token while login
        res.cookie("jwt",jwt_token,{maxAge:7000 * 60 * 60 *24,httpOnly:true})
        res.cookie("jwt_refresh",jwt_refresh_token,{maxAge:28000 * 60 * 60 *24,httpOnly:true})

        res.status(200).send({msg:"User login successfull",error:false,type:user.type,token:jwt_token})
      }else{
        res.status(400).send({msg:"User login failed (wrong password)",error:true})
      }
     }else{
        res.status(400).send({msg:"User login failed (user not registred)",error:true})
     }
    }catch(e){
        res.status(400).send({msg:e.message,error:true})
    }
}

module.exports=login