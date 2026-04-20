import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Item from '../components/Item'
import { useAppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const Listing = () => {
  const { cars, searchQuery, currency } = useAppContext()

  const [selectedFilters, setSelectedFilters] = useState({
    bodyType: [],
    priceRange: []
  })

  const [selectedSort, setSelectedSort] = useState("")
  const [currPage, setCurrPage] = useState(1)

  const itemsPerPage = 6
  const [searchParams] = useSearchParams()
  const heroDestination = (searchParams.get("destination") || "").toLowerCase().trim()

  const sortOptions = ["Relevant", "Low to High", "High to Low"]

  const bodyType = [
    "Coupe", "SUV", "Hatchback", "Sedan",
    "Convertible", "Van", "Grand Tourer"
  ]

  const priceRange = [
    "1000000 to 5000000",
    "5000000 to 20000000",
    "20000000 to 50000000",
    "50000000 to 100000000"
  ]

  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev }
      if (checked) updated[type].push(value)
      else updated[type] = updated[type].filter(v => v !== value)
      return updated
    })
  }

  const sortCars = (a, b) => {
    if (selectedSort === "Low to High") return a.price.sale - b.price.sale
    if (selectedSort === "High to Low") return b.price.sale - a.price.sale
    return 0
  }

  const matchesPrice = (car) => {
    if (selectedFilters.priceRange.length === 0) return true
    return selectedFilters.priceRange.some((range) => {
      const [min, max] = range.split(" to ").map(Number)
      return car.price.sale >= min && car.price.sale <= max
    })
  }

  const matchesType = (car) => {
    if (selectedFilters.bodyType.length === 0) return true
    return selectedFilters.bodyType.includes(car.bodyType)
  }

  const matchesSearch = (car) => {
    if (!searchQuery) return true
    return (
      car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.country.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const matchesHeroDestination = (car) => {
    if (!heroDestination) return true
    return (car.city || "").toLowerCase().includes(heroDestination)
  }

  const filteredCars = useMemo(() => {
    return cars.filter((c) =>
      matchesType(c) &&
      matchesPrice(c) &&
      matchesSearch(c) &&
      matchesHeroDestination(c)
    ).sort(sortCars)
  }, [cars, selectedFilters, selectedSort, searchQuery, heroDestination])

  const getPaginatedCars = () => {
    const startIndex = (currPage - 1) * itemsPerPage
    return filteredCars.slice(startIndex, startIndex + itemsPerPage)
  }

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage)

  // Animation Variants
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemAnim = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <motion.div
      className='bg-primary'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className='max-padd-container px-0! mt-18 pb-16'>
        <div className='flex flex-col sm:flex-row gap-6'>

          {/* FILTER PANEL */}
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='min-w-72 bg-white p-4 pl-6 lg:pl-12 rounded-r-xl my-4'
          >

            <div className='py-3'>
              <h5 className='mb-3'>Sort By</h5>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className='bg-primary ring-1 ring-slate-900/10 outline-none text-sm h-8 w-full rounded px-2'
              >
                {sortOptions.map((sort, i) => (
                  <option key={i} value={sort}>{sort}</option>
                ))}
              </select>
            </div>

            <div className='p-5 mt-5 bg-primary rounded-xl'>
              <h5 className='mb-4'>Car Type</h5>
              {bodyType.map((type) => (
                <label key={type} className='flex gap-2 text-sm mb-1'>
                  <input
                    type="checkbox"
                    checked={selectedFilters.bodyType.includes(type)}
                    onChange={(e) => handleFilterChange(e.target.checked, type, "bodyType")}
                  />
                  {type}
                </label>
              ))}
            </div>

            <div className='p-5 mt-5 bg-primary rounded-xl'>
              <h5 className='mb-4'>Price Range</h5>
              {priceRange.map((price) => (
                <label key={price} className='flex gap-2 text-sm mb-1'>
                  <input
                    type="checkbox"
                    checked={selectedFilters.priceRange.includes(price)}
                    onChange={(e) => handleFilterChange(e.target.checked, price, "priceRange")}
                  />
                  {currency}{Number(price.split(" to ")[0]).toLocaleString('en-IN')} -
                  {currency}{Number(price.split(" to ")[1]).toLocaleString('en-IN')}
                </label>
              ))}
            </div>

          </motion.div>

          {/* CAR LIST */}
          <div className='max-sm:px-10 sm:pr-10 bg-white p-4 rounded-l-xl my-4 w-full'>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'
            >
              {getPaginatedCars().length > 0 ? (
                getPaginatedCars().map((car) => (
                  <motion.div
                    key={car._id}
                    variants={itemAnim}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Item car={car} />
                  </motion.div>
                ))
              ) : (
                <p>No Cars found for selected filters.</p>
              )}
            </motion.div>

            {/* PAGINATION */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className='flexCenter flex flex-wrap mt-14 mb-10 gap-3'
            >

              <button
                disabled={currPage === 1}
                onClick={() => setCurrPage(prev => prev - 1)}
                className='btn-solid py-1 px-3'
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <motion.button
                  key={index}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrPage(index + 1)}
                  className={`btn-outline h-8 w-8 flexCenter ${
                    currPage === index + 1 && "btn-light"
                  }`}
                >
                  {index + 1}
                </motion.button>
              ))}

              <button
                disabled={currPage === totalPages}
                onClick={() => setCurrPage(prev => prev + 1)}
                className='btn-solid py-1 px-3'
              >
                Next
              </button>

            </motion.div>

          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Listing