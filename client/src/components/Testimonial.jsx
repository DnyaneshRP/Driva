import React from 'react'
import { assets } from '../assets/data'
import Title from './Title'

const Testimonial = () => {
  return (
    <section className='max-padd-container py-16 xl:py-32'>
      <Title
        title1={"What People Say"}
        title2={"Don't just take our words"}
        titleStyles={"mb-10"}
        para={"Hear what our users say about us. We're always looking for ways to improve. If you have a positive experience with us, leave a review."}
      />
      {/* Container */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>

        <div className='bg-primary w-full space-y-4 p-3 rounded-md text-gray-500 text-sm'>
          <div className='flexBetween'>
            <div className='flex gap-1'>
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
            </div>
            <p>21 Mar 2026</p>
          </div>
          <p>"I've rented cars from various companies, but the experience with Driva was exceptional."</p>
          <div className='flex items-center gap-2'>
            <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="userImg" className='h-8 w-8 rounded-full' />
            <p className='text-gray-800 font-medium'>Aarav Sharma</p>
          </div>
        </div>

        <div className='bg-primary w-full space-y-4 p-3 rounded-md text-gray-500 text-sm'>
          <div className='flexBetween'>
            <div className='flex gap-1'>
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
            </div>
            <p>12 Jan 2026</p>
          </div>
          <p>"I've rented cars from various companies, but the experience with Driva was exceptional."</p>
          <div className='flex items-center gap-2'>
            <img src="https://randomuser.me/api/portraits/women/37.jpg" alt="userImg" className='h-8 w-8 rounded-full' />
            <p className='text-gray-800 font-medium'>Priya Verma</p>
          </div>
        </div>

        <div className='bg-primary w-full space-y-4 p-3 rounded-md text-gray-500 text-sm'>
          <div className='flexBetween'>
            <div className='flex gap-1'>
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
            </div>
            <p>30 Dec 2025</p>
          </div>
          <p>"I've rented cars from various companies, but the experience with Driva was exceptional."</p>
          <div className='flex items-center gap-2'>
            <img src="https://randomuser.me/api/portraits/men/77.jpg" alt="userImg" className='h-8 w-8 rounded-full' />
            <p className='text-gray-800 font-medium'>Rohan Patil</p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Testimonial