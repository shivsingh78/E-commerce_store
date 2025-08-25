import React, { useContext, useState } from "react";
import logo from "../assets/vcart logo.png";
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { userDataContext } from "../context/UserContext";

function Nav() {
  // Context: user data (from your UserContext)
  const { userData } = useContext(userDataContext);

  // Local states
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="w-full h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black">
      {/* ================= Logo Section ================= */}
      <div className="w-[30%] flex items-center justify-start gap-[10px]">
        <img src={logo} alt="logo" className="w-[30px]" />
        <h1 className="text-[25px] text-black font-sans">E-Store</h1>
      </div>

      {/* ================= Menu Section ================= */}
      <div className="w-[40%]">
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
          <FaUserCircle className="w-[29px] h-[29px] text-black cursor-pointer" />
        )}
        {userData && (
          <div className="w-[30px] h-[30px] bg-[#080808] text-white rounded-full flex items-center justify-center cursor-pointer" onClick={()=>setShowProfile(prev=>!prev)} >
            {userData?.name?.slice(0, 1)}
          </div>
        )}

        {/* Cart Icon */}
        <div className="relative">
          <IoCartOutline className="w-[30px] h-[30px] text-black cursor-pointer" />
          {/* Cart Item Count */}
          <p className="absolute flex items-center justify-center w-[18px] h-[18px] bg-black text-white rounded-full text-[9px] top-[-5px] right-[-8px]">
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
        <div className="absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border-[1px] border-[#aaa9a] rounded-[10px] z-10">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          
        </div>
      }
    </div>
  );
}

export default Nav;
