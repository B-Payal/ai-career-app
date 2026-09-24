const jwt = require("jsonwebtoken");
require("dotenv").config();

 function authMiddleware(req,res, next){
    const authHeader = req.headers.authorization; 
    if(!authHeader?.startsWith("Bearer ")){
         return res.status(401).json({
                message: "Authentication required"
            });
    }
    const token = authHeader.split(" ")[1];
    const verify = jwt.verify(token , process.env.JWT_SECRET);
    if(verify){
        req.user = verify;
        next();
    }else{
        return res.status(401).json({
            message:"not authorized"
        })
    }
    
 } 


 module.exports = authMiddleware;