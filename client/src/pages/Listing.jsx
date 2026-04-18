import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Item from '../components/Item'
import { dummyCars } from '../assets/data'
import { useAppContext } from '../context/AppContext'

const Listing = () => {
  const { cars, searchQuery, currency } = useAppContext()
  const [selectedFilters, setSelectedFilters] = useState(
    {
      bodyType: [],
      priceRange: []
    })

  const [selectedSort, setSelectedSort] = useState("")
  const [currPage, setCurrPage] = useState(1)
  const itemsPerPage = 6
  const [searchParams] = useSearchParams()
  const heroDestination = (searchParams.get("destination") || "").toLowerCase().trim()

  const sortOptions = ["Relevant", "Low to High", "High to Low"];

  const bodyType = [
    "Coupe",
    "SUV",
    "Hatchback",
    "Sedan",
    "Convertible",
    "Van",
    "Grand Tourer"
  ];

  const priceRange = [
    "1000000 to 5000000",
    "5000000 to 20000000",
    "20000000 to 50000000",
    "50000000 to 100000000"
  ];

  // const toggle filter checkboxes
  const handleFilterChange = (checked, value, type) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev }
      if (checked) {
        updated[type].push(value)
      } else {
        updated[type] = updated[type].filter(v => v !== value)
      }
      return updated
    })
  }

  // Sorting function
  const sortCars = (a, b) => {
    if (selectedSort == "Low to High") return a.price.sale - b.price.sale;
    if (selectedSort == "High to Low") return b.price.sale - a.price.sale;
    return 0
  }

  // Price Filter
  const matchesPrice = (car) => {
    if (selectedFilters.priceRange.length === 0) return true;
    return selectedFilters.priceRange.some((range) => {
      const [min, max] = range.split(" to ").map(Number);
      return car.price.sale >= min && car.price.sale <= max
    })
  }

  // Type filter
  const matchesType = (car) => {
    if (selectedFilters.bodyType.length === 0) return true;
    return selectedFilters.bodyType.includes(car.bodyType)
  }

  // Search filter using header's searchquery
  const matchesSearch = (car) => {
    if (!searchQuery) return true;
    return (
      car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.country.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  // Hero destination Filter (from Hero form -> /listing?destination=....)
  const matchesHeroDestination = (car) => {
    if (!heroDestination) return true;
    return (car.city || "").toLowerCase().includes(heroDestination)
  }

  // Filtered & Sorted cars
  const filteredCars = useMemo(() => {
    return dummyCars.filter((c) =>
      matchesType(c) &&
      matchesPrice(c) &&
      matchesSearch(c) &&
      matchesHeroDestination(c)
    ).sort(sortCars)
  }, [dummyCars, selectedFilters, selectedSort, searchQuery, heroDestination])

  // Handle Pagination
  const getPaginatedCars = () => {
    const startIndex = (currPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCars.slice(startIndex, endIndex)
  }

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage)

  return (
    <div className='bg-primary'>
      <div className='max-padd-container px-0! mt-18 pb-16'>
        {/* Container */}
        <div className='flex flex-col sm:flex-row gap-6'>
          {/* Filters - Left Side */}
          <div className='min-w-72 bg-white p-4 pl-6 lg:pl-12 rounded-r-xl my-4'>
            {/* Sort By Price */}
            <div className='py-3'>
              <h5 className='mb-3'>Sort By</h5>
              <select value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)} className='bg-primary ring-1 ring-slate-900/10 outline-none text-gray-30 text-sm font-semibold text-gray-50 h-8 w-full rounded px-2'>
                {sortOptions.map((sort, index) => (
                  <option key={index} value={sort}>{sort}</option>
                ))}
              </select>
            </div>

            {/* Car Type */}
            <div className='p-5 mt-5 bg-primary rounded-xl'>
              <h5 className='mb-4'>Car Type</h5>
              {bodyType.map((type) => (
                <label key={type} className={"flex gap-2 text-sm font-semibold text-gray-50 mb-1"} checked={selectedFilters.bodyType.includes(type)} onChange={(e) => handleFilterChange(e.target.checked, type, "bodyType")}>
                  <input type="checkbox" />
                  {type}
                </label>
              ))}
            </div>

            {/* Price Range */}
            <div className='p-5 mt-5 bg-primary rounded-xl'>
              <h5 className='mb-4'>Price Range</h5>
              {priceRange.map((price) => (
                <label key={price} className={"flex gap-2 text-sm font-semibold text-gray-50 mb-1"} checked={selectedFilters.priceRange.includes(price)} onChange={(e) => handleFilterChange(e.target.checked, price, "priceRange")}>
                  <input type="checkbox" />
                  {currency}{Number(price.split(" to ")[0]).toLocaleString('en-IN')} to {currency}{Number(price.split(" to ")[1]).toLocaleString('en-IN')}
                </label>
              ))}
            </div>

          </div>
          {/* Filtered Cars - Right Side */}
          <div className='max-sm:px-10 sm:pr-10 bg-white p-4 rounded-l-xl my-4'>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
              {getPaginatedCars().length > 0 ? (
                getPaginatedCars().map((car) => (
                  <Item key={car._id} car={car} />
                ))
              ) : (
                <p className='capitalize'>No Cars found for selected filters.</p>
              )}
            </div>
            {/* Pagination */}
            <div className='flexCenter flex flex-wrap mt-14 mb-10 gap-3'>
              {/* Previous Button */}
              <button disabled={currPage === 1} onClick={() => setCurrPage(prev => prev - 1)} className={`btn-solid py-1! px-3! ${currPage === 1 && "opacity-50 cursor-not-allowed"
                }`}>Previous</button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, index) => (
                <button key={index + 1} onClick={() => setCurrPage(index + 1)} className={`btn-outline h-8 w-8 p-0 flexCenter ${currPage === index + 1 && "btn-light"
                  }`}>{index + 1}</button>
              ))}

              {/* Next Button */}
              <button disabled={currPage === totalPages} onClick={() => setCurrPage(prev => prev + 1)} className={`btn-solid py-1! px-3! ${currPage === totalPages && "opacity-50 cursor-not-allowed"
                }`}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Listing