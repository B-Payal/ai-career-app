const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const auth = require("./routes/user.route");
const ai = require("./routes/ai.route");
const analysesRoute = require("./routes/analysis.route");
const interviewRoute = require("./routes/interview.route");
const app = express();
app.use(express.json());

connectDB();


const PORT = process.env.PORT;
app.get("/api/health" , (req,res)=>{
    res.json({message:`Server is running on PORT ${PORT} `});
})

app.use("/api" , auth);
app.use("/api/ai" ,  ai);
app.use("/api/ai" ,  analysesRoute);
app.use("/api/interview" , interviewRoute);

app.listen(PORT , ()=>{
    console.log("server is running")
})

