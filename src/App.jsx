import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { Navigate, Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import ViewNotes from './components/ViewNotes'
import Home from './home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>

     <Navbar></Navbar>
     <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/viewNotes" element={<ViewNotes></ViewNotes>}></Route>
     </Routes>
    </Router>
    </>
  )
}

export default App
