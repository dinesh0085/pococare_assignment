const express=require('express')
const cors=require('cors')
const connectDB = require('./src/Database/connectDB')
require("dotenv").config()
const PORT=process.env.PORT
const userRoute=require("./src/Route/user.route")
const cookieParser=require("cookie-parser")
const auth = require('./src/Middleware/auth.middleware')

const app = express()

app.use(express.urlencoded({extended:true}))

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(express.static("public"))
app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render('home')
})

app.get("/clothes",auth,(req,res)=>{
    res.render('clothes')
})
app.use("/user",userRoute)

app.listen(PORT,async()=>{
    try{
    await connectDB()
    console.log("Databse connected successfully");
    }catch(e){
    console.log(e);
    }
    console.log(`Listening Server on port number ${PORT}`)
    })