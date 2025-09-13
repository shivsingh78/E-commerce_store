import express from 'express';
import isAuth from '../middleware/isAuth.js'
import { allOrders, placeOrder, placeOrderRazorpay, updateStatus, userOrders } from '../controller/orderController.js';
import adminAuth from '../middleware/adminAuth.js'

const orderRoutes = express.Router();

//for user 
orderRoutes.post("/placeorder",isAuth,placeOrder)
orderRoutes.post("/razorpay",isAuth,placeOrderRazorpay)
orderRoutes.post("/userorder",isAuth,userOrders)

//for admin

orderRoutes.post("/list", adminAuth ,allOrders)
orderRoutes.post("/status",isAuth,updateStatus)


export default orderRoutes;