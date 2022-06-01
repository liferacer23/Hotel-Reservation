const express = require("express");
const dotenv = require("dotenv");




dotenv.config();
const app = express();



app.listen(5000 || process.env.PORT,()=>{
console.log("Backend is running on port 5000");
})