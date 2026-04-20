import React from 'react'
import Title from './Title'
import { assets } from '../assets/data'
import { motion } from "framer-motion";

const About = () => {

  // Stagger container for cards
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className='max-padd-container py-16 xl:py-22 pt-36'>
      <div className='flex items-center flex-col lg:flex-row gap-14'>

        {/* Left Side */}
        <motion.div
          className='flex-5'
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Title
            title1={"Your Trusted Car Rental Service"}
            title2={"Helping You Every Step of the Way"}
            paraStyles={"hidden"}
          />

          <p className='mb-10 mt-5'>
            Find reliable car with transparent pricing, verified inspections, flexible pickup and delivery options, and 24/7 customer support for a smooth rental or buying experience.
          </p>

          {/* Cards */}
          <motion.div
            className='grid gap-6 md:grid-cols-2'
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Quick Service",
                desc: "Choose from economy to luxury models, regularly maintained and verified, giving you reliable performance and the perfect car for every trip.",
                style: "bg-primary"
              },
              {
                title: "Wide Vehicle Selection",
                desc: "Book in seconds with instant confirmations and flexible pickup options, so you get on the road fast without waiting or hassles.",
                style: "bg-primaryOne"
              },
              {
                title: "Transparent Pricing",
                desc: "Upfront rates with no hidden fees, clear breakdowns for insurance and extras, so pricing stays predictable and easy to understand before booking.",
                style: "bg-primaryTwo"
              },
              {
                title: "24 / 7 Support",
                desc: "Around the clock customer support via chat and phone, resolving issues quickly and helping with changes, extensions, or roadside assistance anytime you need.",
                style: "bg-primary"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className={`p-4 rounded-xl ${item.style}`}
              >
                <h5>{item.title}</h5>
                <p className='text-sm mt-2'>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side Images */}
        <motion.div
          className='flex-4 flex gap-7'
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.div
            className='relative flex justify-end mb-8'
            whileHover={{ scale: 1.03 }}
          >
            <img src={assets.about1} alt="aboutimg" className='rounded-2xl'/>
          </motion.div>

          <motion.div
            className='relative flex justify-end mt-8'
            whileHover={{ scale: 1.03 }}
          >
            <img src={assets.about2} alt="aboutimg" className='rounded-2xl'/>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

export default About