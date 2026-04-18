import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { assets } from '../assets/data'
import Navbar from './Navbar'
import { useClerk, UserButton } from '@clerk/react'
import { useAppContext } from '../context/AppContext'

const Header = () => {
  const { navigate, user, isOwner, setShowAgencyReg, searchQuery, setSearchQuery } = useAppContext()
  const [menuOpened, setMenuOpened] = useState(false)
  const [active, setActive] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const location = useLocation()
  const { openSignIn } = useClerk()

  const BookingIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M9 16l2 2 4-4" />
    </svg>
  )

  const isHomePage = location.pathname.endsWith('/')

  const toggleMenu = () => setMenuOpened(prev => !prev)

  const handleSearchChange = (e)=> {
    setSearchQuery(e.target.value)

    // Redirect to Listing page if not already there
    if(e.target.value && location.pathname !== "/listing") {
      navigate('/listing')
    } 
  } 

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 10)
      if (window.scrollY > 10) {
        setMenuOpened(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [location.pathname])

  return (
    <header className={`${active ? "bg-white shadow-sm py-2" : "py-3"
      } ${!isHomePage && "bg-white"} fixed top-0 w-full left-0 right-0 z-50 transition-all duration-200`}>
      <div className='max-padd-container'>
        {/* Container */}
        <div className='flexBetween'>
          {/* Logo */}
          <div className='flex flex-1'>
            <Link to={"/"}>
              <img src={assets.logoImg} alt="logoImg" width={88} className='h-7' />
              <span className='text-textColor uppercase text-xs font-extrabold tracking-[6px] relative bottom-1 pl-4'>Driva</span>
            </Link>
          </div>
          {/* Navbar */}
          <Navbar setMenuOpened={setMenuOpened} containerStyles={menuOpened ? "flex items-start flex-col gap-y-8 fixed top-16 right-6 p-5 bg-white shadow-md w-52 ring-1 ring-slate-900/5 rounded-xl z-50" : "hidden lg:flex gap-x-5 xl:gap-x-1 text-sm font-semibold p-1"} />
          {/* Buttons &  Searchbar & Profile */}
          <div className='flex sm:flex-1 items-center sm:justify-end gap-x-4 sm:gap-x-8'>
            {user && (
              <button 
              onClick={()=> isOwner ? navigate("/owner") : setShowAgencyReg(true)} 
              className='btn-outline px-2 py-1 text-xs font-semibold ring-primary bg-transparent'>
                {isOwner ? "Dashboard" : "Register Agency"}
              </button>
            )}
            {/* Searchbar */}
            <div className='relative hidden xl:flex items-center'>
              {/* Input */}
              <div className={`transition-all duration-300 ease-in-out ring-1 ring-slate-900/10 bg-white rounded-full overflow-hidden ${showSearch
                ? "w-66.5 opacity-100 px-4 py-2"
                : "w-11 opacity-0 px-0 py-0"
                }`}>
                <input onChange={handleSearchChange} value={searchQuery} type="text" placeholder='Type here...' className='w-full text-sm outline-none pr-10 placeholder:text-gray-400' />
              </div>
              {/* Toggle Button */}
              <div onClick={() => setShowSearch(prev => !prev)} className='absolute right-0 ring-1 ring-slate-900/10 bg-white p-2 rounded-full cursor-pointer z-10 '>
                <img src={assets.search} alt="" />
              </div>
            </div>
            {/* Menu Toggle */}
            <>
              {menuOpened ? (
                <img onClick={toggleMenu} src={assets.close} alt="" className={`lg:hidden cursor-pointer text-xl`} />
              ) : (
                <img onClick={toggleMenu} src={assets.menu} alt="" className={`lg:hidden cursor-pointer text-xl`} />
              )}
            </>
            {/* User Profile */}
            <div className='group'>
              {user ? (
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: "42px",
                        height: "42px",
                      },
                    },
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label='My Bookings'
                      labelIcon={<BookingIcon />}
                      onClick={() => navigate('/my-bookings')}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              ) : (
                <button onClick={openSignIn} className='btn-solid bg-black flexCenter gap-2 rounded-full'>
                  Login
                  <img src={assets.user} alt="userIcon" className='invert' />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header