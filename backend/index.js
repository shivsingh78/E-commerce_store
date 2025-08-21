import express from 'express'
import dotenv from 'dotenv';
import connectDb from './config/db.js';
dotenv.config()
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';

let port = process.env.PORT || 6000
let app=express()
//middleware
app.use(express.json())
app.use(cookieParser())

//routes
app.use("/api/auth",authRoutes)
app.get('/',(req,res)=>{
     res.send("hello,world")
})
app.listen(port,()=>{
     console.log("hello from backend");
     connectDb()
     

})