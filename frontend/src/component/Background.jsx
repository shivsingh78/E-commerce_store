import React from 'react'
import black1 from '../assets/black1.jpg'
import black2 from '../assets/black2.jpg'
import black3 from '../assets/black3.jpg'
import black4 from '../assets/black4.jpg'

function Background({heroCount}) {
  if(heroCount ===0){
     return <img src={black1} alt="" className='w-[100%] h-[100%] float-left overflow-auto object-cover ' />
  }
  else if(heroCount === 1){
     return <img src={black2} alt="" className='w-[100%] h-[100%] float-left overflow-auto object-cover ' />
  }
  else if(heroCount === 2){
     return <img src={black3} alt="" className='w-[100%] h-[100%] float-left overflow-auto object-cover ' />
  }
  else {
     return <img src={black4} alt="" className='w-[100%] h-[100%] float-left overflow-auto object-cover ' />
  }
}

export default Background