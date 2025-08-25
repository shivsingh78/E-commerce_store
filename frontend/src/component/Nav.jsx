import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/vcart logo.png';

function Nav() {
     const navigate = useNavigate()
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-50 bg-black/30 backdrop-blur-lg shadow-md">
      
      {/* Logo + Title */}
      <div
        className="flex items-center space-x-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="VCart Logo" className="h-10 w-10 object-contain" />
        <h1 className="text-2xl font-extrabold tracking-wide text-white">
          E-Store <span className='text-blue-500'>.</span>
        </h1>
      </div>

      {/* Menu */}
      <ul className="hidden md:flex space-x-8 text-white font-medium">
        <li className="hover:text-teal-400 transition">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-teal-400 transition">
          <Link to="/shop">Shop</Link>
        </li>
        <li className="hover:text-teal-400 transition">
          <Link to="/about">About</Link>
        </li>
        <li className="hover:text-teal-400 transition">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      {/* Buttons */}
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-4 py-2 rounded-xl text-white border border-teal-400 hover:bg-teal-400 hover:text-black transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 rounded-xl bg-teal-400 text-black font-semibold hover:bg-teal-500 transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
