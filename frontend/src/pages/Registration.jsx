import React, { useContext, useState } from 'react'
import logo from '../assets/vcart logo.png'

import google from '../assets/google.png'
import { useNavigate } from 'react-router-dom'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { authDataContext } from "../context/AuthContext";


import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';

function Registration() {
  let [show,setShow]=useState(false)
  let {serverUrl} = useContext(authDataContext)
  let [name,setName]=useState("")
    let [email,setEmail]=useState("")
  let [password,setPassword]=useState("")
  let {usedata,getCurrentUser} = useContext(userDataContext)




  let navigate = useNavigate()

  const handleSignup = async (e) =>{
    try {
      e.preventDefault()
      const result = await axios.post(serverUrl + '/api/auth/registration', {
        name,email,password
      },{withCredentials:true})
      console.log(result.data);
      getCurrentUser()
      navigate("/")

      
    } catch (error) {
      console.log(error);
      
      
    }
  }

  const googleSignup = async () => {
    try {

      const response = await signInWithPopup(auth,provider)
     let user = response.user;
     let name = user.displayName;
     let email = user.email;
     const result = await axios.post(serverUrl + "/api/auth/googlelogin",{name,email},{withCredentials:true})
     console.log(result.data);
     getCurrentUser()
      navigate("/")
     
      
      
    } catch (error) {
      console.log(error);
      
      
    }
  }
  
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start'>
       
      
      
      {/* Sub header */}
      <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px] mt-[80px] '>
        <span className='text-[25px] font-semibold '>Registration Page</span>
        <span className='text-[16px] text-gray-300'>Welcome to E-Store, Place your order</span>
      </div>

      {/* Registration box */}
      <div className="max-w-[600px] w-[90%] h-[500px] bg-[#00000040] border border-[#2d2d2d] backdrop-blur-2xl rounded-xl shadow-lg flex items-center justify-center mt-6 mb-[20px] ">
        <form action=""  onSubmit={handleSignup} className='w-[90%] h-[90%] flex flex-col items-center'>
          
          {/* Google button */}
          <div className='w-[90%] h-[50px] bg-[#2d2d2d] hover:bg-[#3a3a3a] transition rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer font-medium' onClick={googleSignup}>
            <img src={google} alt="google" className='w-[20px]' /> Registration with Google
          </div>
          
          {/* Divider */}
          <div className='w-[100%] h-[50px] flex items-center justify-center gap-[10px]'>
            <div className='w-[40%] h-[1px] bg-[#444]'></div>
            <span className='text-gray-400'>OR</span>
            <div className='w-[40%] h-[1px] bg-[#444]'></div>
          </div>
          
          {/* Input fields */}
          <div className='w-[90%] flex flex-col items-center justify-center gap-[15px] relative'>
            <input type="text" placeholder='Username' required
              className='w-[100%] h-[50px] px-3 border border-[#444] rounded-lg shadow-md bg-transparent text-white placeholder-gray-400 focus:border-[#00bcd4] outline-none transition' onChange={(e)=>setName(e.target.value)} value={name} />
            
            <input type="email" placeholder='Email' required
              className='w-[100%] h-[50px] px-3 border border-[#444] rounded-lg shadow-md bg-transparent text-white placeholder-gray-400 focus:border-[#00bcd4] outline-none transition' onChange={(e)=>setEmail(e.target.value)} value={email}/>
            
            <input type={show?"text": "password"} placeholder='Password' required
              className='w-[100%] h-[50px] px-3 border border-[#444] rounded-lg shadow-md bg-transparent text-white placeholder-gray-400 focus:border-[#00bcd4] outline-none transition' onChange={(e)=>setPassword(e.target.value)} value={password}/>
              {!show && <IoEyeOutline className=' w-[20px] h-[20px] cursor-pointer absolute right-[5%] mt-2.5  ' onClick={()=>setShow(prev=> !prev)} />}

              {show && <IoEyeSharp className=' w-[20px] h-[20px] cursor-pointer absolute right-[5%] mt-2.5  ' onClick={()=>setShow(prev=> !prev)} />}

              <button 
    type="submit" 
    className='w-[90%] h-[50px] mt-4 bg-[#510ca0] text-white font-semibold rounded-lg shadow-lg 
                hover:shadow-[0_0_15px_#510ca0] transition duration-300 cursor-pointer'
  >Create Account</button>
  <p className='flex gap-[10px]  ' >You have any account?<span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer ' onClick={()=>navigate("/login")}>Login</span> </p>


          </div>
        </form>
      </div>
    </div>
  )
}

export default Registration
