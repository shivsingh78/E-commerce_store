import React, { useContext, useState } from 'react'
import ai from '../assets/ai.png'
import open from "../assets/beep.mp3"
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Ai() {
  let { showSearch, setShowSearch, setSearchQuery } = useContext(shopDataContext)
  let navigate = useNavigate()

  let [activeAi,setActiveAi]=useState(false)
  let openingSound = new Audio(open)

  // Speech synthesis for bot replies
  const speak = (message) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US";
    synth.speak(utterance);
  };

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.log("Speech Recognition not supported in this browser");
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim().toLowerCase();
    console.log("User said:", transcript);

    if (transcript.includes("search") && transcript.includes("open") && !showSearch) {
      speak("Opening search");
      setShowSearch(true);
      navigate("/collection");

    } else if (transcript.includes("search") && transcript.includes("close") && showSearch) {
      speak("Closing search");
      setShowSearch(false);

    } else if (transcript.startsWith("search") || transcript.startsWith("find")) {
      const query = transcript.replace(/^(search|find)\s*/, "").trim();
      if (query.length > 0) {
        speak(`Searching for ${query}`);
        setShowSearch(true);
        if (typeof setSearchQuery === "function") {
          setSearchQuery(query); // updates your search state
        }
        navigate("/collection");
      } else {
        toast.error("Please say what you want to search");
      }

    } else if (transcript.includes("collection") || transcript.includes("product")) {
      speak("Opening collection page");
      navigate("/collection");

    }
    else if (transcript.includes("close collections") || transcript.includes("closecollection") || transcript.includes("close collection page") ) {
      speak("close collection page");
      navigate("/");
    }

       else if (transcript.includes("about")) {
      speak("Opening about page");
      navigate("/about");
      setShowSearch(false);

    } else if (transcript.includes("home")) {
      speak("Opening home page");
      navigate("/");
      setShowSearch(false);

    } else if (transcript.includes("cart")) {
      speak("Opening your cart");
      navigate("/cart");
      setShowSearch(false);

    } else if (transcript.includes("contact")) {
      speak("Opening contact page");
      navigate("/contact");
      setShowSearch(false);

    } else if (transcript.includes("order") || transcript.includes("my order") || transcript.includes("orders")) {
      speak("Opening your orders page");
      navigate("/order");
      setShowSearch(false);

    } else {
      toast.error("Try Again");
    }
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };

  recognition.onend = () => {
    console.log("Voice recognition ended.");
  };
  recognition.onend = ()=>{
     setActiveAi(false)
  }

  return (
   <div 
  className="fixed bottom-[100px] md:bottom-[40px] lg:bottom-[20px] left-[20px] z-50"
  onClick={() => {
    recognition.start();
    openingSound.play();
    setActiveAi(true);
  }}
>
  <img 
    src={ai} 
    alt="AI mic" 
    className={`w-[50px] md:w-[70px] lg:w-[90px] cursor-pointer ${activeAi ? 'scale-110' : 'scale-100'} transition-transform`} 
    style={{ 
      filter: activeAi 
        ? "drop-shadow(0px 0px 30px #00d2fc)" 
        : "drop-shadow(0px 0px 20px black)" 
    }} 
  />
</div>

  );
}

export default Ai;
