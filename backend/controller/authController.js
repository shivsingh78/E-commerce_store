import User from "../model/userModel.js";
import validator from "validator"
import bcrypt from 'bcryptjs'
import { genToken } from "../config/token.js"; 



export const registration = async (req,res) => {
     try {
          const {name,email,password} = req.body;
          //check required fields 
          if(!name || !email || !password){
               return res.status(400).json({message: "All required fields must be filled"})
          }
          //validate email format
          if(!validator.isEmail(email)){
               return res.status(400).json({message: "Enter valid Email"})
          }
          //check Password validations
          if(password.length <8){
               return res.status(400).json({message:"Password must be at least 8 character"})
          }

          //check if user already exists
          const existUser = await User.findOne({email})
          if(existUser) {
               return res.send(409).json({message: "User already registered with this email"})
          
          }
           //Hash password
               let hashPassword = await bcrypt.hash(password,10)

               //create user
               const user = await User.create({name,email,password:hashPassword})
               
               // token genrate and send to cookie
               let token = await genToken(user._id)
               res.cookie("token",token,{
                    httpOnly:true,
                    secure:false,
                    sameSite:"Strict",
                    maxAge: 7 * 24 * 60 * 1000

               })
               return res.status(201).json(user)


     
     } catch (error) {
          console.log("Register error");
          return res.status(500).json({message:`registration error ${error}`})
          
          
     }
}

export const login = async (req,res) => {
     try {
          let {email,password} = req.body;
          //validate inputs
          if(!email || !password){
               return res.status(400).json({message:"Email and password are required"})
          }
          //check if user exists
          const user = await User.findOne({email});
          if(!user) {
               return res.status(401).json({message:"Invalid email or password"})
          }
          // compare password
          let isMatch = await bcrypt.compare(password,user.password);
          if(!isMatch){
               return res.status(401).json({message:"Invalid email or password"})
          }
          // Generate JWT 
          let token = await genToken(user._id)
          res.cookie("token",token,{
               httpOnly:true,
               secure:false, 
               sameSite:"Strict",
               maxAge: 7 * 24 *60 *60 *1000

          })
          return res.status(201).json(user)

     } catch (error) {
          console.error("Login error:", error);
  return res.status(500).json({ message: "Server error, please try again later" });
}
     
}
export const logout = async (req,res) => {
     try {
          res.clearCookie("token")
          return res.status(200).json({message:"logout successfully"})
     } catch (error) {
          console.log("logout error");
          return res.status(500).json({message:"logout error " + {error}})
          
          
     } 
}

export const googleLogin = async (req,res) => {
     try {
          let {name,email} = req.body;
          let user = await User.findOne({email})
          //if user doesn't exist create user
          if(!user){
               user = await User.create({
                    name,
                    email
               })
          }

               // token genrate and send to cookie
               let token = await genToken(user._id)
               res.cookie("token",token,{
                    httpOnly:true,
                    secure:false,
                    sameSite:"Strict",
                    maxAge: 7 * 24 * 60 * 1000

               })
               return res.status(200).json(user)


     
     } catch (error) {
          console.log("googleLogin error");
          return res.status(500).json({message:`google login error ${error}`})
          
          
     }
    
}