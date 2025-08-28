import React from 'react'
import {  Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Add from './pages/Add'
import Lists from './pages/Lists'
import Login from './pages/Login'
import Orders from './pages/Orders'



function App() {
  
  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/' element={<Add/>} />
      <Route path='/' element={<Lists/>} />
      <Route path='/' element={<Login/>} />
      <Route path='/' element={<Orders/>} />

     </Routes>
    </>
  )
}

export default App
