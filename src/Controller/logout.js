

const logout=async (req,res)=>{
  res.cookie("jwt","",{maxAge:1})   
  res.cookie("jwt_refresh","",{maxAge:1})
  res.redirect("/")   
}

module.exports=logout