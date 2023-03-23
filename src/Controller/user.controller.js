const bcript=require("bcryptjs")
const jwt=require("jsonwebtoken")

const hashPassword=async (password)=>{
    const hashPassword=await bcript.hash(password,10)
    return hashPassword
}

const comparePassword=async (password,dbPassword)=>{
    const compare=await bcript.compare(password,dbPassword)
    return compare
}

const verifyUserToken=async(token)=>{
    const user=await jwt.verify(token,"SECRET_KEY1")
    return user
}

const verifyUserRefreshToken=async(token)=>{
    const user=await jwt.verify(token,"SECRET_KEY2")
    return user
}


// Generating JWT Token using user credentials
const generateToken=async (id)=>{
    const jwt_token=await jwt.sign({id},"SECRET_KEY1",{
        expiresIn:"7 days"
    })
    return jwt_token
}

const generateRefreshToken=async (id)=>{
    const jwt_token=await jwt.sign({id},"SECRET_KEY2",{
        expiresIn:"28 days"
    })
    return jwt_token
}

module.exports={hashPassword,comparePassword,generateToken,verifyUserToken,verifyUserRefreshToken,generateRefreshToken}