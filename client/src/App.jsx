import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Listing from './pages/Listing'
import CarDetails from './pages/CarDetails'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import MyBookings from './pages/MyBookings'
import Footer from './components/Footer'
import Sidebar from './components/owner/Sidebar'
import Dashboard from './pages/owner/Dashboard'
import AddCar from './pages/owner/AddCar'
import ListCar from './pages/owner/ListCar'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import AgencyReg from './components/AgencyReg'

const App = () => {
  const {showAgencyReg} = useAppContext()
  const location = useLocation()
  const isOwnerPath = location.pathname.includes('owner')

  return (
    <main>
      {!isOwnerPath && <Header/>}
      {showAgencyReg && <AgencyReg/>}
      <Toaster position='bottom-right'/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/listing' element={<Listing/>}/>
        <Route path='/listing/:id' element={<CarDetails/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/my-bookings' element={<MyBookings/>}/>
        <Route path='/owner' element={<Sidebar/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='/owner/add-car' element={<AddCar/>}/>
          <Route path='/owner/list-car' element={<ListCar/>}/>
        </Route>
      </Routes>
      {!isOwnerPath && <Footer/>}
    </main>
  )
}

export default App
