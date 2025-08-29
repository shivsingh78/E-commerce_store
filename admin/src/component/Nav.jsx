import React from 'react'
import {useNavigate} from 'react-router-dom'
import logo from '../assets/vcart logo.png'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { adminDataContext } from '../context/AdminContext'
import { useContext } from 'react'

function Nav() {
     let navigate = useNavigate()
     let {serverUrl} = useContext(authDataContext)
     let {getAdmin} = useContext(adminDataContext)

     const logOut = async () => {
          try {
               const result = await axios.get(serverUrl + "/api/auth/logout",{withCredentials:true} )
               console.log(result.data);
               getAdmin()
               navigate("/login")
               
          } catch (error) {
               console.log(error);
               
               
          }
     }



  return (
    <div className='w-[100vw] h-[70px] bg-[#dcdbdbf8] z-10 fixed top-0 flex items-center justify-between px-[30px] overflow-x-hidden shadow-md shadow-black '>
     <div className='w-[30%] flex items-center justify-start gap-[10px] cursor-pointer ' onClick={()=>navigate("/")}>
          <img src={logo} alt="" className='w-[30px]' />
          
    <h1
    className="
       tracking-wide
      text-lg sm:text-xl md:text-2xl lg:text-3xl
      whitespace-nowrap text-[black] font-sans
    "
  >
    E-Store
  </h1>
     </div>
     <button className='text-[15px] hover:border-[2px] border-[#89daea] cursor-pointer bg-[#000000ca] py-[10px] px-[20px] rounded-2xl text-white  ' onClick={logOut}>
          LogOut
     </button>

    </div>
  )
}

export default Nav