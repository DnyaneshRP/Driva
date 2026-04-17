import React from 'react'
import { blogs } from "../assets/data"

const Blog = () => {

  return (
    <div className='bg-primary py-16 pt-28'>
      <div className='max-padd-container'>
        {/* Container */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 gap-y-12'>
          {blogs.map((blog, index) => (
            <div key={index} className='relative'>
          {/* Image */}
              <div className='bg-white p-4 rounded-2xl'>
                <img src={blog.image} alt={blog.title} className='shadow-xl shadow-slate-900/20 rounded-xl' />
              </div>
           {/* Info */}
              <p className='text-sm font-semibold mt-6'>{blog.category}</p>
              <h5 className='pr-4 mb-1 line-clamp-2'>{blog.title}</h5>
              <p>{blog.description}</p>
              <button className='underline mt-2 font-bold text-sm line-clamp-2'>continue reading</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog