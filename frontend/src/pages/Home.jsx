import React,{useState,useEffect} from 'react'
import Hero from '../component/Hero.jsx'

import Background from '../component/Background'
import Product from './Product.jsx'

function  Home() {
  let heroData=[
    {text1:"30% OFF Limited offer",text2:"Style that"},
    {text1: "Discover the Best of Bold Fashion",text2: "Limited Time Only!"},
    {text1:"Explore Our Best collections",text2:"Now on Sale!"},
    {text1:"Choose your Perfect Fasion Fit",text2:"Now on Sale!"}

  ]
  let [heroCount,setHeroCount]=useState(0)
  useEffect(()=>{
    let interval = setInterval(()=>{
      setHeroCount(prevCount =>(prevCount === 3 ? 0 : prevCount +1))
    },3000)
    return ()=> clearInterval(interval)
  })
  return (
    
  <div className='overflow-x-hidden relative top-[70px]' >
    <div className='w-[100vw] lg:h-[100vh] md:h-[50vh] sm:h-[30vh] bg-gradient-to-l from-[#141414] to-[#0c2025] ' >
      <Background  heroCount={heroCount} />
      <Hero 
      heroCount={heroCount}
      setHeroCount={setHeroCount}
      heroData={heroData[heroCount]}
      />
    </div>
    <Product/>
    </div>
  )
}

export default  Home