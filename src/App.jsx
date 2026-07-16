import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/navbar/navbar'
import Home from './pages/home/home'
import Login from './pages/login/login'
import Registration from './pages/registration/registration'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layouts/layout'
import Dashboard from './components/dashboard/dashboard'
import Profile from './components/profile/profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element = {<Login/>}/>
      <Route path = "/registration" element = {<Registration/>}/>
      <Route element = {<Layout/>}>
        <Route path='/dashboard' element = {<Dashboard name="Bhavadeep Reddy"/>}/>
        <Route path='/profile' element = {<Profile/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App;