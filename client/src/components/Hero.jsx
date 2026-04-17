import React from 'react'
import { useState } from "react";
import { assets, cities } from '../assets/data'

const Hero = () => {

  const [pickUpDate, setPickUpDate] = useState("");
  const today = new Date().toISOString().split("T")[0];

  return (
    <section className='bg-primary'>
      {/* Container */}
      <div className='max-padd-container relative flex justify-end mx-auto flex-col gap-9 py-6 pt-32 z-10'>
        {/* Content */}
        <div className='flexCenter flex-col gap-y-6'>
          <div className='text-center max-w-5xl'>
            <h1 className='capitalize leading-tight'>Explore <span className='bg-linear-to-r from-solid to to-white pl-1 rounded-md'> premium vehicles </span> available in exciting destinations.</h1>
          </div>
          {/* Search/Booking Form */}
          <form className='bg-white text-gray-500 rounded-md md:rounded-full px-6 md:pl-12 py-4 flex flex-col md:flex-row gap-4 lg:gap-x-8 max-w-md md:max-w-4xl ring-1 ring-slate-900/5 relative'>
            <div className='flex flex-col w-full'>
              <div className='flex items-center gap-2'>
                <img src={assets.pin} alt="pinIcon" width={20} />
                <label htmlFor="destinationInput">Destination</label>
              </div>
              <input list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none capitalize" placeholder="Type here" required />
              <datalist id='destinations'>
                {cities.map((city, index) => (
                  <option value={city} key={index} />
                ))}
              </datalist>
            </div>
            
            {/* Pick Up */}
            <div className='flex flex-col w-full'>
              <div className='flex items-center gap-2'>
                <img src={assets.calendar} alt="calendarIcon" width={20} />
                <label htmlFor="pickUp">Pick Up</label>
              </div>

              <input
                id="pickUp"
                type="date"
                value={pickUpDate}
                min={today}   // ❗ cannot select past dates
                onChange={(e) => setPickUpDate(e.target.value)}
                className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
              />
            </div>

            {/* Drop Off */}
            <div className='flex flex-col w-full'>
              <div className='flex items-center gap-2'>
                <img src={assets.calendar} alt="calendarIcon" width={20} />
                <label htmlFor="dropOff">Drop Off</label>
              </div>

              <input
                id="dropOff"
                type="date"
                min={pickUpDate || today}  // ❗ must be >= pickup date
                className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
              />
            </div>

            <button type="submit" className='flexCenter gap-1 rounded-md md:rounded-full bg-solid text-white py-2 md:py-5 px-8 my-auto max-md:w-full max-md:py-1 cursor-pointer' >
              <img src={assets.search} alt="" width={20} className='invert' />
              <span>Search</span>
            </button>
          </form>
        </div>
        <div className='flexCenter'>
          <img src={assets.bg} alt="bgImg" className='w-full md:w-[77%]' />
        </div>
      </div>
    </section>
  )
}

export default Hero