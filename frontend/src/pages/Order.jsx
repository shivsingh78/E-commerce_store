import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function Order() {
     let [orderData,setOrderData] = useState([]);
     let {currency} =useContext(shopDataContext)
     let {serverUrl} = useContext(authDataContext)
     let [loading,setLoading] = useState(false)

     const loadOrderData = async () => {
          try {
               const result = await axios.post(serverUrl + '/api/order/userorder',{},{withCredentials:true});
               if(result.data){
                    let allOrdersItem = []
                    result.data.forEach((order)=>{
                         order.items.map((item)=>{
                              item['status'] = order.status
                              item['payment'] = order.payment
                              item['paymentMethod'] = order.paymentMethod
                              item['date'] = order.date
                              allOrdersItem.push(item)
                         })
                    })
                    setOrderData(allOrdersItem)
               }
               
          } catch (error) {
               console.log(error);
               toast.error(error.message)
               
               
          }
     }
     useEffect(()=>{
          loadOrderData()
     },[])


  return (
    <div  className='w-full min-h-[100vh]  p-[20px] pb-[150px]  overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]  '>
     <div className='h-[8%] w-[100%] text-center mt-[80px] '>
          <Title text1={"MY"} text2={"ORDER"}/>
     </div>
     <div className='w-[100%] h-[92%] flex flex-wrap gap-[20px]  '>
          {
               orderData.map((item,index)=>(
                    <div key={index} className='w-[100%] h-[10%] border-t border-b '>
                         <div className=' w-[100%] h-[80%] flex items-start gap-6 bg-[#51808048] py-[10px] px-[20px] rounded-2xl relative '>
                              <img src={item.image1} alt="" className='w-[130px] h-[130px] rounded-md ' />
                              <div className='flex items-start justify-center flex-col gap-[5px]  '>
                                   <p className='md:text-[25px] text-[20px] text-[#f3f9fc]  '> {item.name} </p>
                                   <div className='flex items-center gap-[8px] md:gap-[20px]  '>
                                        <p className='md:text-[18px] text-[12px] text-[#aaf4e7] '>{currency} {item.price} </p>
                                        <p className='md:text-[18px] text-[12px] text-[#aaf4e7] '> Quantity: {item.quantity} </p>
                                        <p className='md:text-[18px] text-[12px] text-[#aaf4e7] '> Size:  {item.size} </p>

                                   </div>
                                   <div className='flex items-center '>
                                        <p className='md:text-[18px] text-[12px] text-[#aaf4e7]  '> Date: <span className='text-[#e4fbff] pl-[10px] md:text-[16px] text-[11px]  '>{new Date(item.date).toDateString()} </span> </p>

                                   </div>
                                   <div className=' flex items-center'>
<p className='md:text-[16px] text-[12px] text-[#aaf4e7]  '> Payment Method: {item.paymentMethod} </p>
                                   </div>
                                   <div className='absolute md:left-[55%] md:top-[40%] right-[2%] top-[2%] '>
                                        <div className='flex items-center gap-[5px] '>
                                             <p className='min-w-2 h-2 rounded-full bg-green-500  '> </p>
                                             <p className='md:text-[17px] text-[10px] text-[#f3f9fc] '>{item.status} </p>
                                        </div>
                                         </div>
                                         <div className=' md:right-[5%] right-[2%] md:top-[40%] top-[65%]  md:absolute  '>
                                             <button className='px-[15px] py-[7px] rounded-md bg-[#101919] text-[#f3f9fc] text-[12px] md:text-[16px] cursor-pointer active:bg-slate-500 ' onClick={loadOrderData }> 
                                                  Track Order
                          </button>
                                         </div>
                                   

                              </div>


                         </div>

                    </div>
               ))
          }

     </div>

    </div>
  )
}

export default Order