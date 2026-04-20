import React, { useState } from 'react'
import { assets } from '../assets/data'
import { useAppContext } from '../context/AppContext';
import { motion } from "framer-motion";

const Hero = () => {
  const { navigate, searchedCities, setSearchedCities, axios, getToken } = useAppContext()
  const [destination, setDestination] = useState("")

  const onSearch = async (e) => {
    e.preventDefault()
    navigate(`/listing?destination=${destination}`)

    await axios.post(
      '/api/user/store-recent-search',
      { recentSearchedCities: destination },
      { headers: { Authorization: `Bearer ${await getToken()}` } }
    )

    setSearchedCities((prev) => {
      const updated = [...prev, destination]
      if (updated.length > 3) updated.shift()
      return updated
    })
  }

  const [pickUpDate, setPickUpDate] = useState("")
  const today = new Date().toISOString().split("T")[0];

  return (
    <section className='bg-primary'>
      <div className='max-padd-container relative flex justify-end mx-auto flex-col gap-9 py-6 pt-32 z-10'>

        {/* Content */}
        <div className='flexCenter flex-col gap-y-6'>

          {/* Heading Animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-center max-w-5xl'
          >
            <h1 className='capitalize leading-tight'>
              Explore <span className='bg-linear-to-r from-solid to to-white pl-1 rounded-md'>
                premium vehicles
              </span> available in exciting destinations.
            </h1>
          </motion.div>

          {/* Form Animation */}
          <motion.form
            onSubmit={onSearch}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className='bg-white text-gray-500 rounded-md md:rounded-full px-6 md:pl-12 py-4 flex flex-col md:flex-row gap-4 lg:gap-x-8 max-w-md md:max-w-4xl ring-1 ring-slate-900/5 relative'
          >
            {/* Destination */}
            <div className='flex flex-col w-full'>
              <div className='flex items-center gap-2'>
                <img src={assets.pin} alt="" width={20} />
                <label>Destination</label>
              </div>
              <input
                onChange={(e) => setDestination(e.target.value)}
                value={destination}
                list='destinations'
                type="text"
                className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none capitalize"
                placeholder="Type here"
                required
              />
              <datalist id='destinations'>
                {searchedCities.map((city, index) => (
                  <option value={city} key={index} />
                ))}
              </datalist>
            </div>

            {/* Pick Up */}
            <div className='flex flex-col w-full'>
              <div className='flex items-center gap-2'>
                <img src={assets.calendar} alt="" width={20} />
                <label>Pick Up</label>
              </div>
              <input
                type="date"
                value={pickUpDate}
                min={today}
                onChange={(e) => setPickUpDate(e.target.value)}
                className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
              />
            </div>

            {/* Drop Off */}
            <div className='flex flex-col w-full'>
              <div className='flex items-center gap-2'>
                <img src={assets.calendar} alt="" width={20} />
                <label>Drop Off</label>
              </div>
              <input
                type="date"
                min={pickUpDate || today}
                className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
              />
            </div>

            {/* Button Animation */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className='flexCenter gap-1 rounded-md md:rounded-full bg-solid text-white py-2 md:py-5 px-8 my-auto max-md:w-full cursor-pointer'
            >
              <img src={assets.search} alt="" width={20} className='invert' />
              <span>Search</span>
            </motion.button>
          </motion.form>
        </div>

        {/* Image Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='flexCenter'
        >
          <img src={assets.bg} alt="bgImg" className='w-full md:w-[77%]' />
        </motion.div>

      </div>
    </section>
  )
}

export default Hero