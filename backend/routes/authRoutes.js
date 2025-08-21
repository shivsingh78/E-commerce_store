import express from "express"
import { registration,login,logout } from "../controller/authController.js"

const authRoutes = express.Router()

authRoutes.post("/registration",registration)
authRoutes.post("/login",login)
authRoutes.get("/logout",logout)
export default authRoutes