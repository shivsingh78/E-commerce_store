import React, { useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import razorpay  from '../assets/razorpay.jpg'

function PlaceOrder() {
  let [method,setMethod] = useState('cod')
  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025]  flex items-center justify-center flex-col md:flex-row gap-[50px] relative '>

      <div className='lg:w-[50%] w-[100%] flex items-center justify-center lg:mt-[0px] mt-[90px] '>
        <form action="" className='lg:w-[70%] w-[95%] lg:h-[70%] h-[100%] '>
          <div className='py-[10px] '>
            <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
          </div>
          <div className='w-[100%] h-[70px] flex item-center justify-between px-[10px] '>

            <input type="text" placeholder='First name' className='w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required />

            <input type="text" placeholder='Last name' className='w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required />


          </div>

          <div className='w-[100%] h-[70px] flex item-center justify-between px-[10px] '>

            <input type="text" placeholder='Email address' className='w-[100%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required />


          </div>
          <div className='w-[100%] h-[70px] flex item-center justify-between px-[10px] '>

            <input type="text" placeholder='Street' className='w-[100%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required />


          </div>

          <div className='w-[100%] h-[70px] flex item-center justify-between px-[10px] '>

            <input type="text" placeholder='City' className='w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required />

            <input type="text" placeholder='State' className='w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required />


          </div>

          <div className='w-[100%] h-[70px] flex item-center justify-between px-[10px] '>

            <input type="text" placeholder='Pincode' className='w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required />

            <input type="text" placeholder='Country' className='w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required />


          </div>




          <div className='w-[100%] h-[70px] flex item-center justify-between px-[10px] '>

            <input type="text" placeholder='Phone' className='w-[100%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]' required />


          </div>

          <div >
            <button type='submit' className='text-[18px] active:bg-slate-500 cursor-pointer bg-[#3bcee848] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px] absolute lg:right-[20%] bottom-[10%] right-[35%] border-[1px] border-[#80808049] ml-[30px] mt-[20px]  '>
              PLACE ORDER
            </button>

          </div>
          
        </form>

      </div>
      <div className='lg:w-[50%] w-[100%] min-h-[100%] flex items-center justify-center gap-[30px]v '>
          <div className='lg:w-[70%] w-[90%] lg:h-[70%] h-[100%] flex items-center justify-center gap-[10px] flex-col  '>
            <CartTotal showButton={false}/>
             <div className='py-[10px] '>
            <Title text1={'PAYMENT'} text2={'METHOD'}/>
          </div>

          <div className='w-[100%] h-[30vh] lg:h-[100px] flex items-start mt-[20px] lg:mt-[0px] justify-center gap-[50px]  '>

            <button onClick={()=>setMethod('razorpay')} className= {`w-[200px] h-[50px] bg-gradient-to-l from-[#95b3f8] to-[white] text-[14px] px-[20px] rounded-sm text-[#332f6f] font-bold ${method === 'razorpay' ? 'border-[5px] border-blue-900 rounded-sm ' : ''}`}  >
            <img src={razorpay} className='w-[100%] h-[100%]  object-fill rounded-sm '  alt="" />
            </button>

            <button onClick={()=>setMethod('cod')} className= {`w-[200px] h-[50px] bg-gradient-to-l from-[#95b3f8] to-[white] text-[14px] px-[20px] rounded-sm text-[#332f6f] font-bold ${method === 'cod' ? 'border-[5px] border-blue-900 rounded-sm ' : ''}`}  >
              CASH ON DELIVERY
            </button>

          </div>

          </div>

        </div>

    </div>
  )
}

export default PlaceOrder