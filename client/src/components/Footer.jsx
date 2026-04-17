import React from 'react'
import { assets } from '../assets/data'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='pt-16 w-full text-gray-500 bg-primaryTwo border-t border-slate-900/5'>
      <div className='max-padd-container'>
        <div className='flex flex-wrap justify-between gap-12 md:gap-6'>
          <div className='max-w-80'>
            {/* Logo */}
            <div className='flex flex-1'>
              <Link to={"/"}>
                <img src={assets.logoImg} alt="logoImg" width={88} className='h-7' />
                <span className='text-textColor uppercase text-xs font-extrabold tracking-[6px] relative bottom-1 pl-4'>Driva</span>
              </Link>
            </div>
            <p className='text-sm pt-3'>
              Find reliable car with transparent pricing, verified inspections, flexible pickup and delivery options, and 24/7 customer support.
            </p>
            <div className='flex items-center gap-3 mt-4'>
              <img src={assets.facebook} alt="" />
              <img src={assets.instagram} alt="" />
              <img src={assets.twitter} alt="" />
              <img src={assets.linkedin} alt="" />
            </div>
          </div>

          <div>
            <h4 className='text-textColor'>COMPANY</h4>
            <ul className='mt-3 flex flex-col gap-2 text-sm'>
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Partners</a></li>
            </ul>
          </div>

          <div>
            <h4 className='text-textColor'>SUPPORT</h4>
            <ul className='mt-3 flex flex-col gap-2 text-sm'>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Safety Information</a></li>
              <li><a href="#">Cancellation Options</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Accessibility</a></li>
            </ul>
          </div>

          <div className='max-w-80'>
            <h4 className='text-textColor'>STAY UPDATED</h4>
            <p className='mt-3 text-sm'>
              Subscribe to our newsletter for inspiration and special offers.
            </p>
            <div className='flex items-center border pl-4 gap-2 bg-white border-gray-500/30 h-11.5 rounded-full overflow-hidden max-w-md w-full mt-6'>
              <input type="text" className='w-full h-full outline-none text-sm text-gray-500' placeholder='Your email' />
              <button className='btn-solid bg-black font-medium px-3.5! py-2 mr-0.5'>
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <hr className='border-gray-300 mt-8' />
        <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
          <p>© {new Date().getFullYear()} <a href="/">Driva</a>. All rights reserved.</p>
          <ul className='flex items-center gap-4'>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Sitemap</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer