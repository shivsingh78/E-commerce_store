import React, { useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { useState } from 'react'
import { authDataContext } from '../context/AuthContext'
import { useContext } from 'react'
import axios from 'axios'

function Home() {
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)

  const {serverUrl} = useContext(authDataContext)

  const fetchCounts = async () => {
    try {
      const products = await axios.get(`${serverUrl}/api/product/list`,{},{withCredentials:true})
      setTotalProducts(products.data.length)

      const orders = await axios.post(`${serverUrl}/api/order/list`,{},{withCredentials:true})
      setTotalOrders(orders.data.length)
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    fetchCounts()
  },[])

  return (
    <div className=' w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] relative ' >
      <Nav/>
      <Sidebar/>

      <div className='w-[70vw] h-[100vh] absolute left-[25%] flex items-start justify-start flex-col gap-[40px] py-[100px]  '>
       <h1 className='text-[35px] text-[#afe2f2]  '> E-stoe Admin Panel</h1>
       <div className='flex items-center justify-center gap-[50px] flex-col md:flex-row '>
       <div className="text-[#dcfafd] w-[400px] max-w-[90%] h-[200px] bg-[#0000002e] 
    flex flex-col items-center justify-center gap-[20px] rounded-2xl 
    shadow-md shadow-black backdrop-blur-lg 
    md:text-[25px] text-[20px] border border-[#969595]">
  
  <p className="font-semibold">Total No. of Products</p>

  <span className="px-[30px] py-[12px] bg-[#030e11] rounded-lg 
      flex items-center justify-center text-[28px] font-bold 
      border border-[#969595] shadow-inner shadow-[#00000070]">
    {totalProducts}
  </span>
</div>

<div className="text-[#dcfafd] w-[400px] max-w-[90%] h-[200px] bg-[#0000002e] 
    flex flex-col items-center justify-center gap-[20px] rounded-2xl 
    shadow-md shadow-black backdrop-blur-lg 
    md:text-[25px] text-[20px] border border-[#969595]">
  
  <p className="font-semibold">Total No. of Orders</p>

  <span className="px-[30px] py-[12px] bg-[#030e11] rounded-lg 
      flex items-center justify-center text-[28px] font-bold 
      border border-[#969595] shadow-inner shadow-[#00000070]">
    {totalOrders}
  </span>
</div>



       </div>

      </div>
  
    </div>
    
  )
}

export default Home