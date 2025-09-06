import React from 'react'
import Title from '../component/Title'
import contact from '../assets/contact.png'
import NewLetterBox from '../component/NewLetterBox'

function Contact() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[80px] px-4">
      
      {/* Title */}
      <Title text1="CONTACT" text2="US" />

      <div className="w-full flex items-center justify-center flex-col lg:flex-row gap-10">
        
        {/* Left - Image */}
        <div className="lg:w-1/2 w-full flex items-center justify-center">
          <img 
            src={contact} 
            alt="Contact illustration" 
            className="lg:w-[60%] w-[80%] shadow-md shadow-black rounded-md" 
          />
        </div>

        {/* Right - Contact Form */}
        <div className="lg:w-1/2 w-full max-w-lg flex flex-col gap-6 text-white">
          <h3 className="text-2xl font-semibold text-[#bff1f9]">Get in Touch</h3>

          {/* Contact Info */}
          <div className="text-gray-300 text-sm space-y-1">
            <p><b>Email:</b> support@estore.com</p>
            <p><b>Phone:</b> +91 7869124XXX</p>
            <p><b>Address:</b> Rewa, M.P, India</p>
          </div>

          {/* Formspree Form */}
          <form 
            action="https://formspree.io/f/xrbaowbk" 
            method="POST" 
            className="flex flex-col gap-4"
          >
            <input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              required
              className="p-3 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[#bff1f9] focus:ring-1 focus:ring-[#bff1f9] outline-none transition"
            />
            <input 
              type="email" 
              name="email"
              placeholder="Your Email" 
              required
              className="p-3 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[#bff1f9] focus:ring-1 focus:ring-[#bff1f9] outline-none transition"
            />
            <textarea 
              name="message"
              rows="5" 
              placeholder="Your Message" 
              required
              className="p-3 rounded-md bg-[#1a1a1a] border border-gray-600 focus:border-[#bff1f9] focus:ring-1 focus:ring-[#bff1f9] outline-none transition"
            ></textarea>
            <button 
              type="submit" 
              className="bg-[#bff1f9] text-black font-semibold py-3 px-5 rounded-md hover:bg-[#9ee6ef] transition cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Newsletter */}
      <NewLetterBox/>
    </div>
  )
}

export default Contact
