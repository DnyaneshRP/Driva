import React, { useEffect, useState } from 'react'
import Title from './Title'
import Item from './Item'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { useAppContext } from '../context/AppContext'
import { motion } from "framer-motion";

const TopPicks = () => {
    const { cars, searchedCities } = useAppContext()

    const [topPicks, setTopPicks] = useState([]);

    useEffect(() => {
        const data = cars.filter((car) => searchedCities.includes(car.city))
        setTopPicks(data)
    }, [cars, searchedCities])

    return topPicks.length > 0 && (
        <motion.section
            className='max-padd-container py-16 xl:py-22'
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >

            {/* Title Animation */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <Title
                    title1={"Top picks for your"}
                    title2={"Popular in your area"}
                    titleStyles={"mb-10"}
                />
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
                {topPicks.slice(0, 6).map((car, index) => (
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

export default TopPicks