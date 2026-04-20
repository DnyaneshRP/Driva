import React, { useEffect, useState } from 'react'
import { assets } from '../assets/data'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const MyBookings = () => {
  const { currency, user, axios, getToken } = useAppContext()
  const [bookings, setBookings] = useState([])

  const getUserBooking = async () => {
    try {
      const { data } = await axios.get('/api/bookings/user', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        setBookings(data.bookings)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handlePayment = async (bookingId) => {
    try {
      const { data } = await axios.post(
        '/api/bookings/stripe',
        { bookingId },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      )

      if (data.success) {
        window.location.href = data.url
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      getUserBooking()
    }
  }, [user])

  return (
    <motion.div
      className='bg-primary py-16 pt-28'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className='max-padd-container'>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Title
            title2={"My Bookings"}
            title2Styles={"text-4xl"}
            titleStyles={"mb-10"}
          />
        </motion.div>

        {bookings.map((booking, index) => (
          <motion.div
            key={booking._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ scale: 1.01 }}
            className='bg-white ring-1 ring-slate-900/5 p-2 pr-4 mt-3 rounded-lg'
          >

            {/* Car List */}
            <div className='flexStart gap-3 mb-3'>
              <div className='bg-primary rounded-xl overflow-hidden flexCenter h-19'>
                <motion.img
                  src={booking.car.images[0]}
                  alt=""
                  className='max-w-full max-h-full object-contain'
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div>
                <h5 className='capitalize line-clamp-1'>{booking.car.title}</h5>

                <div className='flex gap-4'>
                  <div className='flex items-center gap-x-2'>
                    <h5>Seats</h5>
                    <p>{booking.car.specs.seats}</p>
                  </div>

                  <div className='flex items-center gap-x-2'>
                    <h5>Total:</h5>
                    <p className='text-gray-400 text-sm'>
                      {currency}{booking.totalPrice}
                    </p>
                  </div>
                </div>

                <p className='flex place-items-baseline gap-1 mt-0.5'>
                  <img src={assets.pin} alt="" width={13} />
                  {booking.car.address}
                </p>
              </div>
            </div>

            {/* Booking Summary */}
            <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 border-t border-gray-300 pt-3'>

              <div className='flex gap-2 gap-x-4 flex-wrap'>
                <div className='flex items-center gap-x-2'>
                  <h5>Booking ID:</h5>
                  <p className='text-gray-400 text-xs'>{booking._id}</p>
                </div>

                <div className='flex items-center gap-x-2'>
                  <h5>Pick-Up:</h5>
                  <p className='text-gray-400 text-xs'>
                    {new Date(booking.pickUpDate).toDateString()}
                  </p>
                </div>

                <div className='flex items-center gap-x-2'>
                  <h5>Drop-Off:</h5>
                  <p className='text-gray-400 text-xs'>
                    {new Date(booking.dropOffDate).toDateString()}
                  </p>
                </div>
              </div>

              <div className='flex gap-2 gap-x-3'>
                <div className='flex items-center gap-x-2'>
                  <h5>Payment:</h5>
                  <div className='flex items-center gap-1'>
                    <span
                      className={`min-w-2.5 h-2.5 rounded-full ${
                        booking.isPaid ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    />
                    <p>{booking.isPaid ? "Paid" : "UnPaid"}</p>
                  </div>
                </div>

                {!booking.isPaid && (
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePayment(booking._id)}
                    className='btn-solid py-1! text-sm! rounded-sm'
                  >
                    Pay Now
                  </motion.button>
                )}
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default MyBookings