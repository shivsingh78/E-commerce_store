import express from 'express'
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import cors from "cors"
dotenv.config()
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js' 

let port = process.env.PORT || 6000
let app=express()


//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
     origin:["https://e-store-frontend-4cvi.onrender.com" , "http://localhost:5174",],
     credentials:true
}))

//routes
app.use("/api/auth",authRoutes)
app.use("/api/auth",userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order",orderRoutes)




app.listen(port,()=>{
     console.log("hello from backend");
     connectDb()
     

})
