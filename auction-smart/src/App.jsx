import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/home'
import { Navigate, Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import UserProfile from './pages/UserProfile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/userProfile' element={<UserProfile></UserProfile>}></Route>
      </Routes>
      
         </Router>
    </>
  )
}

export default App
