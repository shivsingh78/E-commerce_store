import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import razorpay  from '../assets/razorpay.jpg'
import { shopDataContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function PlaceOrder() {
  let [method,setMethod] = useState('cod')
  let navigate = useNavigate()
  let {cartItem,setCartItem,getCartAmount,delivery_fee,products} = useContext(shopDataContext)
  let {serverUrl} = useContext(authDataContext)


  let [formData,setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    pinCode:'',
    country:'',
    phone:''
  })

  const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({...data,[name]:value}))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) =>{
        console.log(response);

        const {data} = await axios.post(serverUrl + '/api/order/verifyrazorpay',response,{withCredentials:true})
        if(data){
            toast.success("Payment Successful!");
          navigate("/order")
          setCartItem({})
        } 
        
      }
      
    }
     const rzp = new window.Razorpay(options)
        rzp.open()
  }

  const onSubmitHandler = async(e) =>{
      e.preventDefault()
      try {
        let orderItems = []
        for(const items in cartItem){
          for(const item in cartItem[items]){
            if(cartItem[items][item]>0){
              const itemInfo = structuredClone(products.find(product=> product._id === items))
              if(itemInfo){
                itemInfo.size = item;
                itemInfo.quantity = cartItem[items][item]
                orderItems.push(itemInfo)
              }
            }
          }
        }
        let orderData = {
          address:formData,
          items:orderItems,
          amount:getCartAmount() + delivery_fee
        }
        
        switch (method) {
          case 'cod':
            const result = await axios.post(serverUrl + "/api/order/placeorder", orderData, {withCredentials:true})
            
            console.log("result data",result.data)
            toast.success("Order Placed Successfully")
            
            if(result.data){
              setCartItem({})
              navigate("/order")

            } else{
              
              toast.error(result.data?.message || "Failed to place order")
              
            }
            break;

            case 'razorpay':
              const resultRazorpay = await axios.post(serverUrl + "/api/order/razorpay", orderData, {withCredentials:true})
              if(resultRazorpay.data){
                initPay(resultRazorpay.data);
                
              } else{
                   toast.error("Failed to initialize Razorpay");
              }
              break;

          default:
            break;
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
        
      }
    }




 return (
  <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col lg:flex-row items-start lg:items-center justify-center gap-8 px-4 py-10'>

    {/* Left Side - Delivery Form */}
    <div className='lg:w-1/2 w-full flex items-center justify-center'>
      <form 
        action="" 
        className='w-full max-w-lg bg-transparent' 
        onSubmit={onSubmitHandler}
      >
        <div className='py-4'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        {/* Name */}
        <div className='flex flex-col sm:flex-row gap-4 mb-4'>
          <input 
            type="text" placeholder='First name'
            className='flex-1 h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 text-white placeholder:text-white text-[16px] px-4'
            required name='firstName' value={formData.firstName} onChange={onChangeHandler}
          />
          <input 
            type="text" placeholder='Last name'
            className='flex-1 h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 text-white placeholder:text-white text-[16px] px-4'
            required name='lastName' value={formData.lastName} onChange={onChangeHandler}
          />
        </div>

        {/* Email */}
        <div className='mb-4'>
          <input 
            type="email" placeholder='Email address'
            className='w-full h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 text-white placeholder:text-white text-[16px] px-4'
            required name='email' value={formData.email} onChange={onChangeHandler}
          />
        </div>

        {/* Street */}
        <div className='mb-4'>
          <input 
            type="text" placeholder='Street'
            className='w-full h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 text-white placeholder:text-white text-[16px] px-4'
            required name='street' value={formData.street} onChange={onChangeHandler}
          />
        </div>

        {/* City & State */}
        <div className='flex flex-col sm:flex-row gap-4 mb-4'>
          <input 
            type="text" placeholder='City'
            className='flex-1 h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 text-white placeholder:text-white text-[16px] px-4'
            required name='city' value={formData.city} onChange={onChangeHandler}
          />
          <input 
            type="text" placeholder='State'
            className='flex-1 h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 text-white placeholder:text-white text-[16px] px-4'
            required name='state' value={formData.state} onChange={onChangeHandler}
          />
        </div>

        {/* Pincode & Country */}
        <div className='flex flex-col sm:flex-row gap-4 mb-4'>
          <input 
            type="text" placeholder='Pincode'
            className='flex-1 h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 text-white placeholder:text-white text-[16px] px-4'
            required name='pinCode' value={formData.pinCode} onChange={onChangeHandler}
          />
          <input 
            type="text" placeholder='Country'
            className='flex-1 h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 text-white placeholder:text-white text-[16px] px-4'
            required name='country' value={formData.country} onChange={onChangeHandler}
          />
        </div>

        {/* Phone */}
        <div className='mb-6'>
          <input 
            type="text" placeholder='Phone'
            className='w-full h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 text-white placeholder:text-white text-[16px] px-4'
            required name='phone' value={formData.phone} onChange={onChangeHandler}
          />
        </div>

        {/* Submit */}
        <div className='w-full flex justify-center'>
          <button 
            type='submit' 
            className='w-full sm:w-auto text-[18px] bg-[#3bcee848] py-3 px-8 rounded-2xl text-white border border-gray-500 hover:bg-[#3bcee880]'
          >
            PLACE ORDER
          </button>
        </div>
      </form>
    </div>

    {/* Right Side - Cart & Payment */}
   {/* Right Side - Cart & Payment */}
<div className='lg:w-1/2 w-full flex flex-col-reverse lg:flex-col items-center gap-6 px-2'>

  {/* Cart Total - goes bottom on mobile, top on desktop */}
  <CartTotal showButton={false} />

  <div className='py-2'>
    <Title text1={'PAYMENT'} text2={'METHOD'} />
  </div>

  {/* Payment Buttons */}
  <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4">
   {/* Razorpay Button */}
<button 
  onClick={() => setMethod('razorpay')} 
  className={`w-full sm:w-1/2 h-[55px] rounded-md flex items-center justify-center gap-3 
              ${method === 'razorpay' 
                ? 'border-4 border-blue-900 bg-white shadow-md' 
                : 'border border-gray-300 bg-white'}`}
>
  <img 
    src={razorpay} 
    alt="Razorpay Logo" 
    className="h-[24px] sm:h-[28px] w-auto object-contain" 
  />
  <span className="text-base sm:text-lg font-semibold text-gray-800">Pay with Razorpay</span>
</button>


    {/* COD Button */}
<button 
  onClick={() => setMethod('cod')} 
  className={`w-full sm:w-1/2 h-[55px] rounded-md flex items-center justify-center 
              font-semibold text-base sm:text-lg text-[#332f6f] 
              ${method === 'cod' 
                ? 'border-4 border-blue-900 bg-gradient-to-l from-[#95b3f8] to-white shadow-md' 
                : 'border border-gray-300 bg-gradient-to-l from-[#95b3f8] to-white'}`}
>
  Cash on Delivery
</button>

  </div>

  {/* Place Order Button */}
  <div className='w-full flex justify-center mt-6'>
    <button 
      type='submit' 
      className='w-full sm:w-auto text-[16px] sm:text-[18px] bg-[#3bcee848] py-3 px-8 rounded-2xl text-white border border-gray-500 hover:bg-[#3bcee880]'
    >
      PLACE ORDER
    </button>
  </div>
</div>

  </div>
)

}

export default PlaceOrder