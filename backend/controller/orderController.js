import Order from "../model/orderModel.js";
import User from '../model/userModel.js'


export const placeOrder = async (req,res) => {
     try {
          const {items , amount , address} = req.body;

          if(!items || !amount || !address){
               return res.status(400).json({message: "Missing required fields"})
          }
          const userId = req.userId;
          const orderData = {
               items,
               amount,
               userId,
               address,
               paymentMethod: 'COD' ,
               payment:false,
          }

          const newOrder = new Order(orderData)
          await newOrder.save()
          //clear user cart

          await User.findByIdAndUpdate(userId,{cartData:{}})
          return res.status(201).json({
               message:'Order place',
               order:newOrder
          })
          
     } catch (error) {
          console.log(error);
          res.status(500).json({message:'Order place error'})
          
          
     }
     
}