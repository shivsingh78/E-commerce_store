import React, { useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import upload from '../assets/upload.jpg'

function Add() {
  let [image1,setImage1] = useState(false)
   let [image2,setImage2] = useState(false)
    let [image3,setImage3] = useState(false)
     let [image4,setImage4] = useState(false)
     const [name,setName] = useState("")
     const [description,setdescription] = useState("")
     const [category,setcategory] = useState("Men")
     const [price,setprice] = useState("")
     const [subCategory,setsubCategory] = useState("TopWear")
     const [bestseller,setbestseller] = useState(false)
     const [sizes,setsizes] = useState([])



  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white] overflow-hidden relative '>
      <Nav/>
      <Sidebar/>


      <div className='w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden absolute right-0 '>

        <form action="" className='w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[30px] py-[60px] px-[30px] md:px-[60px] '>

          <div className='w-[400px] h-[50px] text-[25px] md:text-[40px] text-white '>Add Product Page</div>
          {/* for product Image */}
          <div className='w-[80%] h-[130px] flex items-start justify-center flex-col mt-[20px] gap-[10px] '>
            <p className='text-[20px] md:text-[25px] font-semibold '> Upload Image</p>
            <div className='w-[100%] h-[100%] flex items-center justify-start  '>
              <label htmlFor="image1" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7] '>
                <img src={ !image1 ? upload : URL.createObjectURL(image1)} alt="upload img" className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[20x] ' />
                <input type="file" id='image1' hidden onChange={(e)=>setImage1(e.target.files[0])} required />

              </label>
              <label htmlFor="image2" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7] '>
                <img src={ !image2 ? upload : URL.createObjectURL(image2)} alt="upload img" className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[20x] ' />
                <input type="file" id='image2' hidden onChange={(e)=>setImage2(e.target.files[0])} required />

              </label>
<label htmlFor="image3" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7] '>
                <img src={ !image3 ? upload : URL.createObjectURL(image3)} alt="upload img" className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[20x] ' />
                <input type="file" id='image3' hidden onChange={(e)=>setImage3(e.target.files[0])}  required />

              </label>
<label htmlFor="image4" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer hover:border-[#46d1f7] '>
                <img src={ !image4 ? upload : URL.createObjectURL(image4)} alt="upload img" className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[20x] ' />
                <input type="file" id='image4' hidden onChange={(e)=>setImage4(e.target.files[0])} required/>

              </label>


            </div>
          </div>
          {/* for product */}

          <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px] '>
            <p className=' text-[20px] md:text-[25px] font-semibold  '>Product Name</p>
            <input type="text " placeholder='Type here' className='w-[600px] max-w-[90%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2] ' onChange={(e)=>setName(e.target.value)} value={name} required/>


          </div>

          <div className='w-[80%]  flex items-start justify-center flex-col gap-[10px] '>
            <p className=' text-[20px] md:text-[25px] font-semibold  '> Enter product Description</p>
            <textarea type="text " placeholder='Type here' className='w-[600px] max-w-[90%] h-[100px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2] py-[10px] resize-none' onChange={(e)=>setDescription(e.target.value)} value={description} required/>


          </div>

          {/* category area*/}

          <div className='w-[80%] flex item-center gap-[10px] flex-wrap '>
            <div className='md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px] '>
              <p className=' text-[20px] md:text-[25px] font-semibold  w-[100%]'>
                 Product Category
              </p>
              <select name="" id="" className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px] ' onChange={(e)=>setCategory(e.target.value)} >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>


            </div>
            

            <div className='md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[10px] '>
              <p className=' text-[20px] md:text-[25px] font-semibold  w-[100%]'>
                 Sub-Category
              </p>
              <select name="" id="" className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px] ' onChange={(e)=>setSubCategory(e.target.value)} >
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>


            </div>
            {/*Product Price */}
            <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px] '>
            <p className=' text-[20px] md:text-[25px] font-semibold  '>Product Price</p>
            <input type="number" placeholder='₹ 2000' className='w-[600px] max-w-[90%] h-[40px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 px-[20px] text-[18px] placeholder:text-[#ffffffc2] ' onChange={(e)=>setPrice(e.target.value)} value={price} required />


          </div>
            
          </div>

          {/*sizes setion */}
          <div className='w-[80%] h-[220px] md:h-[100px] flex items-start justify-center flex-col gap-[10px] py-[10px] md:py-[0px]  '>
            <p className=' text-[20px] md:text-[25px] font-semibold  '>Product size</p>
            <div className='flex items-center justify-start gap-[15px] flex-wrap '>
              <div className='px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ' onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev,"S"])}> 
                S

              </div>
              <div className='px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer '>
                M

              </div>
              <div className='px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer '>
                L

              </div>
              <div className='px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer '>
                XL

              </div>
              <div className='px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer '>
                XXL

              </div>

            </div>

          </div>
        </form>

      </div>

    </div>
  )
}

export default Add