import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { assets, cities } from '../assets/data'
import Title from './Title'
import Item from './Item'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// import required modules
import { Autoplay } from 'swiper/modules';
import { useAppContext } from '../context/AppContext'

const FeaturedCars = () => {
  const {cars} = useAppContext()

  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    const data = cars.filter((car) => cities.includes(car.city))
    setFeatured(data)
  }, [cars])
  return (
    <section className='max-padd-container py-16 xl:py-22'>
      <Title
        title1={"Your Next Car Awaits"}
        title2={"Start Driving With Ease"}
        titleStyles={"mb-10"}
      />
      <div className='flexBetween mt-8 mb-6'>
        <h5>
          <span className='font-bold'>Displaying 1-6 </span>
          from 3k listings
        </h5>
        <Link
          to={'/listing'}
          onClick={() => scrollTo(0, 0)}
          className='bg-solid text-white text-2xl rounded-md p-2 flexCenter'
        >
          <img src={assets.sliders} alt="" className='invert' />
        </Link>
      </div>
      {/* Container */}
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
        {featured.slice(0,6).map((car) => (
          <SwiperSlide key={car._id}>
            <Item car={car}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default FeaturedCars