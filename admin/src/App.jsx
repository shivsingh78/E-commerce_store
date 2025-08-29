import React from 'react'
import {  Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Add from './pages/Add'
import Lists from './pages/Lists'
import Login from './pages/Login'
import Orders from './pages/Orders'
import { useContext } from 'react';
import { adminDataContext } from './context/AdminContext';



function App() {
  let {adminData} = useContext(adminDataContext)
  
  return (
    <>
     {
      !adminData ? <Login/> : <>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/add' element={<Add/>} />
      <Route path='/lists' element={<Lists/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/orders' element={<Orders/>} />

     </Routes>
     </>
     }
    </>
  )
}

export default App
