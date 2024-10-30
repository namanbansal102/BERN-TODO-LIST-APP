import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/home'
import { Navigate, Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import UserProfile from './pages/UserProfile'
import ViewAuction from './pages/ViewAuction'
import AuctionPage from './pages/AuctionPage'
import AddAuction from './pages/AddAuction'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/userProfile' element={<UserProfile></UserProfile>}></Route>
        <Route path='/view-auction' element={<ViewAuction></ViewAuction>}></Route>
        <Route path='/add-auction' element={<AddAuction></AddAuction>}></Route>
        <Route path='/view-auction/:id' element={<AuctionPage></AuctionPage>}></Route>
      </Routes>
      
         </Router>
    </>
  )
}

export default App
