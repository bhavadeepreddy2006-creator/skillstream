import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './components/navbar/navbar'
import Home from './pages/home/home'
import Login from './pages/login/login'
import Registration from './pages/registeration/registeration'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='body'>
      {/* <h1>SKILLSTREAM</h1> */}
      {/* <Navbar/> */}
      {/* <Home/> */}
      {/* <Login/> */}
      <Registration/>
    </div>
  )
}

export default App;
