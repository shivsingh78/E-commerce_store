import React, { useContext, useState } from "react";
import logo from "../assets/vcart logo.png";
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import { userDataContext } from "../context/UserContext";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { authDataContext } from "../context/AuthContext";

function Nav() {
  // Context: user data (from your UserContext)
  const {getCurrentUser, userData } = useContext(userDataContext);
  const {serverUrl} = useContext(authDataContext)

  // Local states
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  let navigate = useNavigate()
  const handleLogout = async () =>{
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout" , {withCredentials:true})
      console.log(result.data);
      getCurrentUser()
     
      
    } catch (error) {
      console.log(error);
      
      
    }
  }


  return (
    <div className="w-full h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black">
      {/* ================= Logo Section ================= */}
      <div className="w-[20%] lg:w-[30%] flex items-center justify-start gap-[10px]">
  <img src={logo} alt="logo" className="w-[30px]" />
  <h1 className="text-[25px] text-black font-sans flex flex-nowrap items-center space-x-1">
    <span>E-</span>
    <span>Store</span>
  </h1>
</div>

      {/* ================= Menu Section ================= */}
      <div className="w-[50%] lg:w-[600px] hidden md:flex">
        <ul className="flex items-center justify-center gap-[19px] text-white">
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl">
            HOME
          </li>
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl">
            COLLECTIONS
          </li>
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl">
            ABOUT
          </li>
          <li className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl">
            CONTACT
          </li>
        </ul>
      </div>

      {/* ================= Right Icons (Search, User, Cart) ================= */}
      <div className="w-[30%] flex items-center justify-end gap-[20px] relative">
        {/* Toggle Search Icon */}
        {!showSearch && (
          <IoSearchCircleOutline
            className="w-[38px] h-[38px] text-black cursor-pointer"
            onClick={() => setShowSearch((prev) => !prev)}
          />
        )}
        {showSearch && (
          <IoSearchCircleSharp
            className="w-[38px] h-[38px] text-black cursor-pointer"
            onClick={() => setShowSearch((prev) => !prev)}
          />
        )}

        {/* User / Profile */}
        {!userData && (
          <FaUserCircle className="w-[29px] h-[29px] text-black cursor-pointer" onClick={()=>setShowProfile(prev=>!prev)} />
        )}
        {userData && (
          <div className="w-[30px] h-[30px] bg-[#080808] text-white rounded-full flex items-center justify-center cursor-pointer" onClick={()=>setShowProfile(prev=>!prev)} >
            {userData?.name?.slice(0, 1)}
          </div>
        )}

        {/* Cart Icon */}
        <div className="relative">
          <IoCartOutline className="w-[30px] h-[30px] text-black cursor-pointer hidden md:block" />
          {/* Cart Item Count */}
          <p className="absolute flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-black text-white rounded-full text-[9px] top-[-5px] right-[-8px] hidden md:flex">
  10
</p>

            
        </div>
      </div>

      {/* ================= Search Bar ================= */}
      {showSearch && (
        <div className="w-full h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 flex items-center justify-center">
          <input
            type="text"
            className="w-[50%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-white text-[18px]"
            placeholder="Search here"
          />
        </div>
      )}

      {/* ================= Profile Dropdown ================= */}
      {showProfile && 
        <div className="absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-[10px] z-10">
          <ul className="w-[100%] h-[100%] flex items-start justify-around flex-col text-[17px] py-[10px] text-[white] ">

            {!userData && <li className="w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer " onClick={()=>{navigate("/login");setShowProfile(false)}}>Login</li>}

            {userData&& <li className="w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer " onClick={()=>{handleLogout();setShowProfile(false);navigate("/login")}}>LogOut</li>}

            <li className="w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer ">Orders</li>
            <li className="w-[100%] hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer ">About</li>
          </ul>
          
        </div>
      }
      <div className="w-[100vw] h-[90px] flex items-center justify-between px-[12px] fixed bottom-0 left-0 bg-[#191818] md:hidden ">
        <button className="text-[white] flex items-center justify-center flex-col gap-[2px] " >
          <IoMdHome className="w-[25px] h-[25px] text-[white] md:hidden " />
          Home

        </button>
        <button className="text-[white] flex items-center justify-center flex-col gap-[2px] " >
          <HiOutlineCollection className="w-[25px] h-[25px] text-[white] md:hidden " />
          Collections

        </button>
        <button className="text-[white] flex items-center justify-center flex-col gap-[2px] " >
          <MdContacts className="w-[25px] h-[25px] text-[white] md:hidden " />
          Contact

        </button>
        <button className="text-[white] flex items-center justify-center flex-col gap-[2px] " >
          <IoCartOutline className="w-[25px] h-[25px] text-[white] md:hidden " />
          
          Cart

        </button>
        
         </div>
    </div>
  );
}

export default Nav;
