import React from 'react'
import { assets } from '../assets/data'
import Title from './Title'
import { motion } from "framer-motion";

const Testimonial = () => {

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.section
      className='max-padd-container py-16 xl:py-32'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
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
          title1={"What People Say"}
          title2={"Don't just take our words"}
          titleStyles={"mb-10"}
          para={"Hear what our users say about us. We're always looking for ways to improve. If you have a positive experience with us, leave a review."}
        />
      </motion.div>

      {/* Cards */}
      <motion.div
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >

        {[
          {
            stars: 5,
            date: "21 Mar 2026",
            img: "https://randomuser.me/api/portraits/men/45.jpg",
            name: "Aarav Sharma"
          },
          {
            stars: 4,
            date: "12 Jan 2026",
            img: "https://randomuser.me/api/portraits/women/37.jpg",
            name: "Priya Verma"
          },
          {
            stars: 5,
            date: "30 Dec 2025",
            img: "https://randomuser.me/api/portraits/men/77.jpg",
            name: "Rohan Patil"
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className='bg-primary w-full space-y-4 p-3 rounded-md text-gray-500 text-sm'
          >

            {/* Stars + Date */}
            <div className='flexBetween'>
              <div className='flex gap-1'>
                {[...Array(item.stars)].map((_, i) => (
                  <img key={i} src={assets.star} alt="" width={16} />
                ))}
              </div>
              <p>{item.date}</p>
            </div>

            {/* Review */}
            <p>
              "I've rented cars from various companies, but the experience with Driva was exceptional."
            </p>

            {/* User */}
            <div className='flex items-center gap-2'>
              <motion.img
                src={item.img}
                alt="userImg"
                className='h-8 w-8 rounded-full'
                whileHover={{ scale: 1.1 }}
              />
              <p className='text-gray-800 font-medium'>{item.name}</p>
            </div>

          </motion.div>
        ))}

      </motion.div>
    </motion.section>
  )
}

export default Testimonial