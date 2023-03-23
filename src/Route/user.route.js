const express=require("express");
const login = require("../Controller/login");
const login_view = require("../Controller/login_view");
const logout = require("../Controller/logout");
const signup = require("../Controller/signup");
const signup_view = require("../Controller/signup_view");

const app=express.Router()

app.post("/signup",signup)
app.post("/login",login)
app.get("/signup",signup_view)
app.get("/login",login_view)
app.get("/logout",logout)



module.exports=app