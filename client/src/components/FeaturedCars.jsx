import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { assets, cities } from '../assets/data'
import Title from './Title'
import Item from './Item'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { useAppContext } from '../context/AppContext'
import { motion } from "framer-motion";

const FeaturedCars = () => {
  const { cars } = useAppContext()

  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const data = cars.filter((car) => cities.includes(car.city))
    setFeatured(data)
  }, [cars])

  return (
    <motion.section
      className='max-padd-container py-16 xl:py-22'
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Title
          title1={"Your Next Car Awaits"}
          title2={"Start Driving With Ease"}
          titleStyles={"mb-10"}
        />
      </motion.div>

      {/* Header Row */}
      <motion.div
        className='flexBetween mt-8 mb-6'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <h5>
          <span className='font-bold'>Displaying 1-6 </span>
          from 3k listings
        </h5>

        {/* Button Animation */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Link
            to={'/listing'}
            onClick={() => scrollTo(0, 0)}
            className='bg-solid text-white text-2xl rounded-md p-2 flexCenter'
          >
            <img src={assets.sliders} alt="" className='invert' />
          </Link>
        </motion.div>
      </motion.div>

      {/* Swiper */}
      <Swiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          600: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1124: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1300: {
            slidesPerView: 4,
            spaceBetween: 30,
          }
        }}
        modules={[Autoplay]}
        className="h-122 md:h-133.25 xl:h-105.5 mt-5"
      >
        {featured.slice(0, 6).map((car, index) => (
          <SwiperSlide key={car._id}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
            >
              <Item car={car} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

    </motion.section>
  )
}

export default FeaturedCars