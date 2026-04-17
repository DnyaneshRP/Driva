import React from 'react'
import Title from './Title'
import { assets } from '../assets/data'

const About = () => {
  return (
    <section className='max-padd-container py-16 xl:py-28 pt-36'>
      {/* Container */}
      <div className='flex items-center flex-col lg:flex-row gap-14'>
        {/* Info - Left Side */}
        <div className='flex-5'>
            <Title
              title1={"Your Trusted Car Rental Service"}
              title2={"Helping You Every Step of the Way"}
              paraStyles={"hidden"}
            />
            <p className='mb-10 mt-5'>Find reliable car with transparent pricing, verified inspections, flexible pickup and delivery options, and 24/7 customer support for a smooth rental or buying experience.</p>
            <div className='grid gap-6 md:grid-cols-2'>
              <div className='p-4 rounded-xl bg-primary'>
                <h5>Quick Service</h5>
                <p className='text-sm mt-2'>Choose from economy to luxury models, regularly maintained and verified, giving you reliable performance and the perfect car for every trip.</p>
              </div>
              <div className='p-4 rounded-xl bg-primaryOne'>
                <h5>Wide Vehicle Selection</h5>
                <p className='text-sm mt-2'>Book in seconds with instant confirmations and flexible pickup options, so you get on the road fast without waiting or hassles.</p>
              </div>
              <div className='p-4 rounded-xl bg-primaryTwo'>
                <h5>Transparent Pricing</h5>
                <p className='text-sm mt-2'>Upfront rates with no hidden fees, clear breakdowns for insurance and extras, so pricing stays predictable and easy to understand before booking.</p>
              </div>
              <div className='p-4 rounded-xl bg-primary'>
                <h5>24 / 7 Support</h5>
                <p className='text-sm mt-2'>Around the clock customer support via chat and phone, resolving issues quickly and helping with changes, extensions, or roadside assistance anytime you need.</p>
              </div>
            </div>
        </div>
        {/* Image - Right Side */}
        <div className='flex-4 flex gap-7'>
          <div className='relative flex justify-end mb-8'>
            <img src={assets.about1} alt="aboutimg" className='rounded-2xl'/>
          </div>
          <div className='relative flex justify-end mt-8'>
            <img src={assets.about2} alt="aboutimg" className='rounded-2xl'/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About