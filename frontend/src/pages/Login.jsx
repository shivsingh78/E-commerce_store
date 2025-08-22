import React, { useState } from "react";
import Logo from "../assets/vcart logo.png";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeSharp } from "react-icons/io5";

function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white flex flex-col items-center justify-center">
      {/* Header */}
      <div
        className="w-full h-[70px] flex items-center gap-3 px-6 cursor-pointer bg-[#1e293b]/80 shadow-md"
        onClick={() => navigate("/")}
      >
        <img className="w-[40px]" src={Logo} alt="logo" />
        <h1 className="text-[22px] font-semibold tracking-wide">
          SparkCart
        </h1>
      </div>

      {/* Login Box */}
      <div className="max-w-[400px] w-[90%] mt-8 bg-[#ffffff0f] border border-[#ffffff2f] backdrop-blur-md rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2">Login</h2>
        <p className="text-sm text-gray-300 mb-6">
          Welcome back! Please login to your account.
        </p>

        {/* Form */}
        <form className="w-full flex flex-col gap-5">
          <input
            type="text"
            placeholder="Email"
            className="w-full h-[45px] px-4 rounded-lg bg-transparent border border-gray-500 placeholder-gray-300 text-white focus:border-blue-400 outline-none"
            required
          />

          {/* Password with eye toggle */}
          <div className="relative w-full">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full h-[45px] px-4 pr-10 rounded-lg bg-transparent border border-gray-500 placeholder-gray-300 text-white focus:border-blue-400 outline-none"
              required
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
