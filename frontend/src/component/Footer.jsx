import React from "react";
import logo from "../assets/vcart logo.png";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <div className="w-full md:h-[40vh] h-auto bg-[#dbfcfcec] flex flex-col">
      {/* Top Section */}
      <div className="w-full md:h-[30vh] h-auto flex flex-col md:flex-row items-center md:items-start justify-between md:px-12 px-5 py-6 gap-6 md:gap-0">
        {/* Logo + About */}
        <div className="md:w-[30%] w-full flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="logo"
              className="md:w-[40px] md:h-[40px] w-[30px] h-[30px]"
            />
            <p className="text-[19px] md:text-[20px] text-black whitespace-nowrap font-semibold">
              E-Store
            </p>
          </div>
          <p className="text-[15px] text-[#1e2223] hidden md:block text-justify">
            E-Store is your all-in-one online shopping destination, offering
            top-quality products, unbeatable deals, and fast delivery — all
            backed by trusted service designed to make your life easier every
            day.
          </p>
          <p className="text-[14px] text-[#1e2223] md:hidden text-center">
            Fast, Easy, Reliable. E-Store Shopping
          </p>
        </div>

        {/* Company Links */}
        <div className="md:w-[25%] w-full flex flex-col items-center gap-2">
          <p className="text-[19px] md:text-[20px] text-[#1e2223] font-semibold">
            COMPANY
          </p>
          <ul className="flex flex-col gap-1 items-center md:items-start">
            <li className="text-[15px] text-[#1e2223] cursor-pointer">Home</li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer">About us</li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer">Delivery</li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="md:w-[25%] w-full flex flex-col items-center gap-2">
          <p className="text-[19px] md:text-[20px] text-[#1e2223] font-semibold">
            GET IN TOUCH
          </p>
          <ul className="flex flex-col gap-1 items-center md:items-start">
            <li className="text-[15px] text-[#1e2223] cursor-pointer">
              +91-78691249XX
            </li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer">
              contact@estore.com
            </li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer">
              +1-123-456-7980
            </li>
            <li className="text-[15px] text-[#1e2223] cursor-pointer">
              admin@estore.com
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-slate-400"></div>

      {/* Bottom Section (Desktop) */}
      <div className="hidden md:flex w-full h-[6vh] bg-[#dbfcfcec] items-center justify-between px-12">
        <p className="text-[14px] text-[#1e2223]">
          © 2025 estore.com — All Rights Reserved
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/shivsingh78"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-[18px] cursor-pointer text-[#1e2223] hover:text-black" />
          </a>
          <a
            href="https://www.linkedin.com/in/shivsinghbaghel/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn className="text-[18px] cursor-pointer text-[#1e2223] hover:text-blue-600" />
          </a>
        </div>
      </div>

      {/* Bottom Section (Mobile Above NavBar) */}
      <div className="md:hidden flex flex-col items-center gap-3 mt-4 pb-[70px]">
        <div className="flex items-center justify-center gap-5">
          <a
            href="https://github.com/shivsingh78"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-[18px] cursor-pointer text-[#1e2223] hover:text-black" />
          </a>
          <a
            href="https://www.linkedin.com/in/shivsinghbaghel/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn className="text-[18px] cursor-pointer text-[#1e2223] hover:text-blue-600" />
          </a>
        </div>
        <p className="text-[13px] text-[#1e2223] text-center">
          © 2025 estore.com — All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
