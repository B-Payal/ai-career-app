const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const mongoose = require("mongoose");
require("dotenv").config();



async function connectDB(){
try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connection successful");
    
} catch (error) {
    console.log(`Failed to connect: ${error}`);
    process.exit(1);
    
}
}

module.exports= connectDB;