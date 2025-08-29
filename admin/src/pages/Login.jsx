import React, { useState } from "react";
import { IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import logo from '../assets/vcart logo.png'
import axios from 'axios'
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";
import {useNavigate} from 'react-router-dom'


function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  let {serverUrl} = useContext(authDataContext)
  let {adminData , getAdmin} = useContext(adminDataContext)
  let navigate = useNavigate()

  const AdminLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(serverUrl + "/api/auth/adminLogin",{email, password}, {withCredentials:true})
     
      console.log(result.data);
      getAdmin()
      navigate("/")
      
      
    } catch (error) {
      console.log(error);
      
      
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white flex flex-col items-center justify-center">
      
      {/* ✅ Logo + Title at top */}
      <div className="absolute top-6 flex items-center gap-3">
        {/* Replace with your logo image */}
        <img
          src={logo}
          alt="E-Store Logo"
          className="w-10 h-10 rounded-md"
        />
        <h1 className="text-2xl font-bold tracking-wide">E-Store</h1>
      </div>

      {/* Login Box */}
      <div className="max-w-[400px] w-[90%] bg-[#ffffff0f] border border-[#ffffff2f] backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col items-center mt-[70px]">
        <h2 className="text-2xl font-bold mb-2" onClick={AdminLogin}>Login</h2>
        <p className="text-sm text-gray-300 mb-6">
          Welcome to E-Store, Apply to Admin Login
        </p>

        {/* Form */}
        <form onSubmit={AdminLogin} className="w-full flex flex-col gap-5">
          <input
            type="text"
            placeholder="Email"
            className="w-full h-[45px] px-4 rounded-lg bg-transparent border border-gray-500 placeholder-gray-300 text-white focus:border-blue-400 outline-none"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          {/* Password with eye toggle */}
          <div className="relative w-full">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full h-[45px] px-4 pr-10 rounded-lg bg-transparent border border-gray-500 placeholder-gray-300 text-white focus:border-blue-400 outline-none"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {show ? (
              <IoEyeSharp
                className="w-[20px] h-[20px] cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
                onClick={() => setShow(false)}
              />
            ) : (
              <IoEyeOutline
                className="w-[20px] h-[20px] cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
                onClick={() => setShow(true)}
              />
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-[45px] bg-gradient-to-r from-blue-600 to-indigo-500 hover:opacity-90 transition rounded-lg font-semibold shadow-lg cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
