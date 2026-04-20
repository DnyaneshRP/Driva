import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const ListCar = () => {

  const { axios, getToken, user, currency } = useAppContext()
  const [cars, setCars] = useState([])

  const getCars = async () => {
    try {
      const { data } = await axios.get('/api/cars/owner', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      if (data.success) {
        setCars(data.cars)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post(
        '/api/cars/toggle-availability',
        { carId },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      )

      if (data.success) {
        toast.success(data.message)
        getCars()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      getCars()
    }
  }, [user])

  return (
    <motion.div
      className='md:px-8 py-6 xlPy-8 m-1 sm:m-3 h-[97vh] overflow-y-scroll lg:w-11/12 bg-white shadow rounded-xl'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Table */}
      <div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex justify-between flex-wrap gap-2 sm:grid grid-cols-[2fr_2fr_1fr_1fr] lg:grid-cols-[0.5fr_2fr_2fr_1fr_1fr] px-6 py-3 bg-solid text-white border-b border-slate-900/10 rounded-t-xl'
        >
          <h5 className='hidden lg:block'>Index</h5>
          <h5>Name</h5>
          <h5>Address</h5>
          <h5>Price</h5>
          <h5>Available</h5>
        </motion.div>

        <div>
          {cars.map((car, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              className='flex justify-between items-center flex-wrap gap-2 sm:grid grid-cols-[2fr_2fr_1fr_1fr] lg:grid-cols-[0.5fr_2fr_2fr_1fr_1fr] px-6 py-3 bg-primary text-gray-50 text-sm font-semibold border-b border-slate-900/10'
            >
              <div className='hidden lg:block'>{index + 1}</div>

              <div className='flexStart gap-x-2 max-w-64'>
                <div className='overflow-hidden rounded-lg'>
                  <motion.img
                    src={car.images[0]}
                    alt={car.title}
                    className='w-16 rounded-lg'
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <div className='line-clamp-2'>{car.title}</div>
              </div>

              <div>{car.address}</div>

              <div>{currency}{car.price.sale}</div>

              <div>
                <label className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
                  <input
                    onChange={() => toggleAvailability(car._id)}
                    type="checkbox"
                    className='sr-only peer'
                    defaultChecked={car.isAvailable}
                  />
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className='w-10 h-6 bg-slate-300 rounded-full peer peer-checked:bg-solid transition-colors duration-200'
                  />
                  <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4' />
                </label>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  )
}

export default ListCar