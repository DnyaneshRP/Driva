import React from 'react'
import { blogs } from "../assets/data"
import { motion } from "framer-motion";

const Blog = () => {

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      className='bg-primary py-16 pt-28'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className='max-padd-container'>

        {/* Grid */}
        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 gap-y-12'
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, rotate: 0.5 }}
              transition={{ duration: 0.3 }}
              className='relative cursor-pointer'
            >

              {/* Image */}
              <div className='bg-white p-4 rounded-2xl overflow-hidden'>
                <motion.img
                  src={blog.image}
                  alt={blog.title}
                  className='shadow-xl shadow-slate-900/20 rounded-xl'
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Info */}
              <p className='text-sm font-semibold mt-6'>{blog.category}</p>

              <h5 className='pr-4 mb-1 line-clamp-2'>
                {blog.title}
              </h5>

              <p>{blog.description}</p>

              {/* Button */}
              <motion.button
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                className='underline mt-2 font-bold text-sm line-clamp-2'
              >
                continue reading →
              </motion.button>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.div>
  )
}

export default Blog