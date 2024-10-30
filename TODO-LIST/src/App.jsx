import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { Navigate, Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import ViewNotes from './components/ViewNotes'
import Home from './home'
import AddNotes from './components/addNotes'
import Register from './components/register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-black '>
    <Router>

     <Navbar></Navbar>
     <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/viewNotes" element={<ViewNotes></ViewNotes>}></Route>
      <Route path="/addNotes" element={<AddNotes></AddNotes>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
     </Routes>
    </Router>
    </div>
  )
}

export default App
