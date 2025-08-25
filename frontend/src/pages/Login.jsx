import React, { useContext, useState } from "react";

import google from '../assets/google.png'
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from "../context/UserContext";

function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
   let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")
    let {serverUrl} = useContext(authDataContext)
    let {getCurrentUser}= useContext(userDataContext)

    const handleLogin = async (e) => 
      {
        e.preventDefault()
      try {
        let result = await axios.post(serverUrl + '/api/auth/login',{
          email,password
        },{withCredentials:true})
        console.log(result.data);
        getCurrentUser()
        navigate("/")
        
        
      } catch (error) {
        console.log(error);
        
        
      }
    }
    //google login
    const googlelogin = async () => {
        try {
    
          const response = await signInWithPopup(auth,provider)
         let user = response.user;
         let name = user.displayName;
         let email = user.email;
         const result = await axios.post(serverUrl + "/api/auth/googlelogin",{name,email},{withCredentials:true})
         console.log(result.data);
         
          
          
        } catch (error) {
          console.log(error);
          
          
        }
      }
      

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white flex flex-col items-center justify-center">
      {/* Header */}
      <div
        onClick={() => navigate("/")}
      >
        
      </div>
     

      {/* Login Box */}
      <div className="max-w-[400px] w-[90%]  bg-[#ffffff0f] border border-[#ffffff2f] backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col items-center mt-[70px]">
        <h2 className="text-2xl font-bold mb-2">Login</h2>
        <p className="text-sm text-gray-300 mb-6">
          Welcome back! Please login to your account.
        </p>
         {/* Google Login */}
        <div className="w-full h-[50px] border border-gray-400 rounded-lg flex items-center justify-center gap-3 cursor-pointer hover:bg-[#ffffff15] transition " onClick={googlelogin}>
          <img src={google} alt="Google" className="w-[22px]" />
          <span className="text-sm">Login with Google</span>
        </div>
        {/* Divider */}
          <div className='w-[100%] h-[50px] flex items-center justify-center gap-[10px]'>
            <div className='w-[40%] h-[1px] bg-[#444]'></div>
            <span className='text-gray-400'>OR</span>
            <div className='w-[40%] h-[1px] bg-[#444]'></div>
          </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
          <input
            type="text"
            placeholder="Email"
            className="w-full h-[45px] px-4 rounded-lg bg-transparent border border-gray-500 placeholder-gray-300 text-white focus:border-blue-400 outline-none"
            required onChange={(e)=>setEmail(e.target.value)} value={email}
          />

          {/* Password with eye toggle */}
          <div className="relative w-full">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full h-[45px] px-4 pr-10 rounded-lg bg-transparent border border-gray-500 placeholder-gray-300 text-white focus:border-blue-400 outline-none"
              required onChange={(e)=>setPassword(e.target.value)} value={password}
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

        {/* Extra Links */}
        <div className="flex flex-col items-center gap-2 mt-5 text-sm text-gray-300">
          <p className="cursor-pointer hover:text-white">Forgot Password?</p>
          <p>
            Don’t have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Create New Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
