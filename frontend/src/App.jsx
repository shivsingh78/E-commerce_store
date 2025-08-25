import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Registration from './pages/Registration'
import Home from './pages/Home.jsx'
import Login from './pages/Login'
import Nav from './component/Nav.jsx'

function App() {
  return (
    <>
 
      <Nav />
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Registration/>}/>

    </Routes>
    </>
  )
}

export default App