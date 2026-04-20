import React, { useState, useEffect } from 'react'
import { assets } from '../assets/data'
import { useParams } from 'react-router-dom'
import CarImages from '../components/CarImages'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.4, delay: i * 0.08 }
  })
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
}

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  }
}

const CarDetails = () => {
  const { currency, cars, navigate, axios, getToken } = useAppContext()
  const [car, setCar] = useState(null)
  const { id } = useParams()
  const [pickUpDate, setPickUpDate] = useState(null)
  const [dropOffDate, setDropOffDate] = useState(null)
  const [isAvailable, setIsAvailable] = useState(false)

  // Check Availability
  const checkAvailability = async () => {
    try {
      if (pickUpDate > dropOffDate) {
        toast.error("PickUpDate should be less than DropOffDate")
      }

      const { data } = await axios.post("/api/bookings/check-availability", { car: id, pickUpDate, dropOffDate })

      if (data.success) {
        if (data.isAvailable) {
          setIsAvailable(true)
          toast.success("Car is Available")
        } else {
          setIsAvailable(false)
          toast.error("Car is not Available!")
        }
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Book car if isAvailable
  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      if (!isAvailable) {
        return checkAvailability()
      } else {
        const { data } = await axios.post('/api/bookings/book', { car: id, pickUpDate, dropOffDate }, { headers: { Authorization: `Bearer ${await getToken()}` } })

        if (data.success) {
          toast.success(data.message)
          navigate("/my-bookings")
          scrollTo(0, 0)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (cars && cars.length > 0) {
      const foundCar = cars.find(c => c._id === id)
      if (foundCar) {
        setCar(foundCar)
      }
    }
  }, [cars, id])

  return (
    <AnimatePresence>
      {car && (
        <motion.div
          className='bg-primary'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className='max-padd-container px-6 pt-2 pb-16'>
            {/* Container */}
            <div className='flex flex-col md:flex-row gap-6 mt-16'>

              {/* Info - Left Side */}
              <motion.div
                className='flex-5 bg-white p-5 rounded-xl my-4'
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                {/* Address */}
                <motion.p
                  className='flexStart gap-x-2'
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  <img src={assets.pin} alt="" width={19} />
                  <span>{car.address}</span>
                </motion.p>

                {/* Title + Price */}
                <motion.div
                  className='flex justify-between flex-col sm:flex-row sm:items-end mt-3'
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  <h3>{car.title}</h3>
                  <h4>{currency}{car.price.sale} | {car.price.rent}.00/day</h4>
                </motion.div>

                {/* Body Type + Stars */}
                <motion.div
                  className='flex justify-between items-start my-1'
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                >
                  <h4 className='text-solid'>{car.bodyType}</h4>
                  <div className='flex items-baseline gap-2 relative top-1.5'>
                    <h4 className='relative bottom-0.5 text-black'>5.0</h4>
                    {[...Array(5)].map((_, i) => (
                      <motion.img
                        key={i}
                        src={assets.star}
                        alt=""
                        width={18}
                        initial={{ opacity: 0, scale: 0.3, rotate: -30 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.4 + i * 0.07, duration: 0.35, ease: 'backOut' }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Specs */}
                <motion.div
                  className='flex gap-x-4 mt-3'
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                >
                  {[
                    { icon: assets.transmission, value: car.specs.transmission },
                    { icon: assets.seats, value: car.specs.seats },
                    { icon: assets.fuelType, value: car.specs.fuelType },
                    { icon: assets.odometer, value: car.odometer },
                  ].map((spec, i) => (
                    <motion.p
                      key={i}
                      className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-medium'
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <img src={spec.icon} alt="" width={19} />
                      {spec.value}
                    </motion.p>
                  ))}
                </motion.div>

                {/* Description */}
                <motion.div
                  className='mt-6'
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={5}
                >
                  <h4 className='mt-4 mb-1'>Car Details</h4>
                  <p className='mb-4'>{car.description}</p>
                </motion.div>

                {/* Features */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={6}
                >
                  <h4 className='mt-6 mb-2'>Features</h4>
                  <div className='flex gap-3 flex-wrap'>
                    {car.features.map((feature, i) => (
                      <motion.p
                        key={feature}
                        className='p-3 py-1 rounded-lg bg-primary'
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.06, duration: 0.3, ease: 'backOut' }}
                        whileHover={{ scale: 1.06, transition: { duration: 0.15 } }}
                      >
                        {feature}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>

                {/* Form | Check Availability */}
                <motion.form
                  onSubmit={onSubmitHandler}
                  className='text-gray-500 bg-primary rounded-lg px-6 py-4 flex flex-col lg:flex-row gap-4 max-w-md lg:max-w-full ring-1 ring-slate-900/5 relative mt-10'
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  custom={7}
                >
                  <div className='flex flex-col w-full'>
                    <div className='flex items-center gap-2'>
                      <img src={assets.calendar} alt="calendarIcon" width={20} />
                      <label htmlFor="pickUpDate">Pick Up</label>
                    </div>
                    <input
                      type="date"
                      onChange={(e) => setPickUpDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      id='pickUpDate'
                      className='rounded bg-white border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none'
                    />
                  </div>

                  <div className='flex flex-col w-full'>
                    <div className='flex items-center gap-2'>
                      <img src={assets.calendar} alt="calendarIcon" width={20} />
                      <label htmlFor="dropOffDate">Drop Off</label>
                    </div>
                    <input
                      type="date"
                      onChange={(e) => setDropOffDate(e.target.value)}
                      min={pickUpDate}
                      id='dropOffDate'
                      disabled={!pickUpDate}
                      className='rounded bg-white border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none'
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className='flexCenter gap-1 rounded-md btn-solid min-w-44'
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 18 }}
                  >
                    <img src={assets.search} alt="searchIcon" width={20} className='invert' />
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={isAvailable ? 'book' : 'check'}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                      >
                        {isAvailable ? "Book Car" : "Check Dates"}
                      </motion.span>
                    </AnimatePresence>
                  </motion.button>
                </motion.form>

                {/* Contact Agency */}
                <motion.div
                  className='p-6 bg-primary rounded-xl mt-10 max-w-sm'
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={8}
                >
                  <h4 className='mb-3'>For Buying Contact</h4>
                  <div className='text-sm sm:w-80 divide-y divide-gray-500/30 ring-1 ring-slate-900/10 rounded'>
                    <div className='flex items-start justify-between p-3'>
                      <div>
                        <div className='flex items-center space-x-2'>
                          <h5>{car.agency.name}</h5>
                          <p className='bg-green-500/20 px-2 py-0.5 rounded-full text-xs text-green-600 border border-green-500/30'>Agency</p>
                        </div>
                        <p>Agency Office</p>
                      </div>
                      <motion.img
                        src={car.agency.owner.image}
                        alt=""
                        className='h-10 w-10 rounded-full'
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.9, duration: 0.4, ease: 'backOut' }}
                      />
                    </div>
                    <div className='flexStart gap-2 p-1.5'>
                      <div className='bg-green-500/20 p-1 rounded-full border border-green-500/30'>
                        <img src={assets.phone} alt="" width={14} />
                      </div>
                      <p>{car.agency.contact}</p>
                    </div>
                    <div className='flexStart gap-2 p-1.5'>
                      <div className='bg-green-500/20 p-1 rounded-full border border-green-500/30'>
                        <img src={assets.mail} alt="" width={14} />
                      </div>
                      <p>{car.agency.email}</p>
                    </div>
                    <div className='flex items-center divide-x divide-gray-500/30'>
                      {['Send email', 'Call now'].map((label, i) => (
                        <motion.button
                          key={label}
                          className='flex items-center justify-center gap-2 w-1/2 py-3 cursor-pointer'
                          whileHover={{ backgroundColor: 'rgba(0,0,0,0.04)', transition: { duration: 0.15 } }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img src={i === 0 ? assets.mail : assets.phone} alt="" width={19} />
                          {label}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Images - Right Side */}
              <motion.div
                className='flex flex-4 w-full bg-white p-4 rounded-xl my-4'
                variants={slideRight}
                initial="hidden"
                animate="visible"
              >
                <CarImages car={car} />
              </motion.div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CarDetails