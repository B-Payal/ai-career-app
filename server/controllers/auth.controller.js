 const jwt=require("jsonwebtoken");
 const bcrypt = require("bcryptjs");
 const User = require("../models/user.model");


async function register(req,res){
    try{
    const {name , email , password}=req.body;
    const hashed = await bcrypt.hash(password , 10);
    await User.create({
        name,
        email , 
        password:hashed
    });
    return res.status(201).json({
        success:true,
        message:"User registered successful"
    })}catch(err){
        return res.status(500).json({
            success:"false",
            message:"server error"
        })
    }
    

}

async function login(req,res){
    const {email , password}=req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({success:true, message:"user doesn't exist"})
    }
    const payload = {id:user.id}
    const token=jwt.sign(payload , process.env.JWT_SECRET , {expiresIn:"1h"})

    const compare =await bcrypt.compare(password , user.password);
    if(compare){
        return res.status(200).json({
            success:true,
            token,
            message:"user logged in successfully"
        })
    }

} 

module.exports = {register , login};