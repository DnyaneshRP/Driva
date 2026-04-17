import logoImg from "./logo.png";
import search from './search.svg'
import user from './user.svg'
import menu from './menu.svg'
import close from './close.svg'
import bg from './bg.png'
import right from './right.svg'
import pin from './pin.svg'
import calendar from './calendar.svg'
import star from './star.svg'
import sliders from './sliders.svg'
import car from './car.svg'
import carBlack from './car-black.svg'
import carPlus from './car-plus.svg'
import transmission from './transmission.svg'
import seats from './seats.svg'
import fuelType from './fuel-type.svg'
import odometer from './odometer.svg'
import facebook from './facebook.svg'
import instagram from './instagram.svg'
import twitter from './twitter.svg'
import linkedin from './linkedin.svg'
import mail from './mail.svg'
import phone from './phone.svg'
import house from './house.svg'
import dollar from './dollar.svg'
import pound from './pound.svg'
import map from './map.svg'
import list from './list.svg'
import dashboard from './dashboard.svg'
import userImg from './user.png'
import user1 from './user1.png'
import user2 from './user2.png'
import user3 from './user3.png'
import img1 from "../assets/img1.png"
import img2 from "../assets/img2.png"
import img3 from "../assets/img3.png"
import img4 from "../assets/img4.png"
import img5 from "../assets/img5.png"
import img6 from "../assets/img6.png"
import img7 from "../assets/img7.png"
import img8 from "../assets/img8.png"
import img9 from "../assets/img9.png"
import img10 from "../assets/img10.png"
import img11 from "../assets/img11.png"
import cImg2 from "../assets/cImg2.png"
import cImg3 from "../assets/cImg3.png"
import cImg4 from "../assets/cImg4.png"
import about1 from "../assets/about1.png";
import about2 from "../assets/about2.png";
import banner from "../assets/banner.png";
import agencyReg from "../assets/agencyReg.png";
import uploadIcon from "../assets/upload_icon.png"
// Blogs
import blog1 from "../assets/blogs/blog1.jpg";
import blog2 from "../assets/blogs/blog2.jpg";
import blog3 from "../assets/blogs/blog3.jpg";
import blog4 from "../assets/blogs/blog4.jpg";
import blog5 from "../assets/blogs/blog5.jpg";
import blog6 from "../assets/blogs/blog6.jpg";
import blog7 from "../assets/blogs/blog7.jpg";
import blog8 from "../assets/blogs/blog8.jpg";


export const assets = {
    logoImg,
    search,
    user,
    menu,
    close,
    bg,
    right,
    pin,
    calendar,
    star,
    sliders,
    odometer,
    transmission,
    seats,
    fuelType,
    car,
    carBlack,
    carPlus,
    facebook,
    instagram,
    twitter,
    linkedin,
    mail,
    phone,
    dollar,
    house,
    pound,
    map,
    dashboard,
    list,
    userImg,
    user1,
    user2,
    user3,
    about1,
    about2,
    banner,
    agencyReg,
    uploadIcon
}

export const cities = [
    "Abu Dhabi",
    "New York",
    "Toronto",
    "Berlin",
];


export const dummyAgentData = {
    "_id": "agent_2unqyL4diJFP1E3pIBnasc7w8hP",
    "username": "Izabella Stress",
    "image": userImg,
    "role": "agencyOwner", 
    "createdAt": "2025-03-25T09:29:16.367Z",
    "updatedAt": "2025-04-10T06:34:48.719Z",
    "__v": 1,
    "recentSearchedCities": cities,
  }
  
  
  // Agency Dummy Data
  export const dummyAgencyData = {
    "_id": "67f7642a197ac559e4089b99",
    "name": "Aurora Motors",
    "contact": "0123456789",
    "email": "contact@auroramotors.com", 
    "address": "Suite 405, Midtown Business Tower, Park Avenue",
    "owner": dummyAgentData,
    "city": "Toronto",
    "createdAt": "2025-04-12T10:45:30.000Z",
    "updatedAt": "2025-04-12T10:45:30.000Z",
    "__v": 0
}


// Cars Listings Dummy Data
export const dummyCars = [
    {
        "_id": "67f7647c197ac559e4089b96",
        "agency": dummyAgencyData,
        "title": "Porsche 911 Carrera",
        "description": "Two-door sport coupe with sharp handling, responsive turbocharged engine, and a driver focused cockpit. Suited for spirited drives and short trips with premium materials and modern connectivity.",
        "address": "789 Park Lane, New York, USA",
        "city": "New York",
        "country": "USA",
        "bodyType": "Coupe",
        "price":{
          "rent": 299,
          "sale": 33000
        },
        "specs": {
          "transmission": "Manual",
          "seats": 2,
          "fuelType": "Petrol"
        },
        "odometer": 12500,
        "features": ["Rear Camera","Apple CarPlay","Keyless Entry","Adaptive Cruise","Heated Seats","Sunroof"],
        "images": [img1, cImg2, cImg3, cImg4],
        "isAvailable": true,
        "status": "available",
        "createdAt": "2025-04-10T06:26:04.013Z",
        "updatedAt": "2025-04-10T06:26:04.013Z",
        "__v": 0
    },
    {
        "_id": "67f76452197ac559e4089b8e",
        "agency": dummyAgencyData,
        "title": "Lamborghini Urus",
        "description": "Mid-size SUV with robust chassis, elevated ride height, and all-wheel capability. Practical interior, large cargo area, and modern driver aids for family trips and mixed road conditions.",
        "address": "301 Sunset Boulevard, Los Angeles, USA",
        "city": "Los Angeles",
        "country": "USA",
        "bodyType": "SUV",
        "price":{
         "rent": 599,
         "sale": 29000
        },
         "specs": {
          "transmission": "Automatic",
          "seats": 5,
          "fuelType": "Electric"
        },
        "odometer": 46000,
        "features": ["Rear Camera","Keyless Entry","Adaptive Cruise","Sunroof","Parking Assist","Cruise Control"],
        "images": [img2, cImg3, cImg4, cImg2],
        "isAvailable": true,
        "status": "available",
        "createdAt": "2025-04-10T06:25:22.593Z",
        "updatedAt": "2025-04-10T06:25:22.593Z",
        "__v": 0
    },
    {
        "_id": "67f76406197ac559e4089b82",
        "agency": dummyAgencyData,
        "title": "Audi RS3 Sportback",
        "description": "Compact hatchback built for efficient city driving, easy parking, and low running costs. Agile steering and good fuel economy with practical cargo flexibility.",
        "address": "900 Bay Street, Toronto, Canada",
        "city": "Toronto",
        "country": "Canada",
        "bodyType": "Hatchback",
        "price":{
          "rent": 299,
          "sale": 19000
        },
         "specs": {
          "transmission": "Manual",
          "seats": 5,
          "fuelType": "Diesel"
        },
        "odometer": 18500,
        "features": ["Apple CarPlay","Keyless Entry","Adaptive Cruise","Heated Seats","Parking Assist","Rear Camera"],
        "images": [img3, cImg4, cImg3, cImg2],
        "isAvailable": true,
        "status": "available",
        "createdAt": "2025-04-10T06:24:06.285Z",
        "updatedAt": "2025-04-10T06:24:06.285Z",
        "__v": 0
    },
    {
        "_id": "67f763d8197ac559e4089b7a",
        "agency": dummyAgencyData,
        "title": "Mercedes-Benz S 500",
        "description": "Four-door executive sedan focused on comfort and refinement. Smooth ride, spacious rear seating, advanced safety features, and premium cabin materials for long-distance comfort.",
        "address": "29 Alexanderplatz, Berlin, Germany",
        "city": "Berlin",
        "country": "Germany",
        "bodyType": "Sedan",
         "price":{
           "rent": 399,
           "sale": 33000
        },
         "specs": {
          "transmission": "Automatic",
          "seats": 5,
          "fuelType": "Electric"
        },
        "odometer": 29500,
        "features": ["Adaptive Cruise","Heated Seats","Sunroof","Parking Assist","Cruise Control","Apple CarPlay"],
        "images": [img4, cImg2, cImg3, cImg4],
        "isAvailable": true,
        "status": "available",
        "createdAt": "2025-04-10T06:23:20.252Z",
        "updatedAt": "2025-04-10T06:23:20.252Z",
        "__v": 0
    },
    {
    "_id": "67f7663b197ac559e4089bb8",
    "agency": dummyAgencyData,
    "title": "Porsche Taycan Turbo S",
    "description": "All-electric performance sedan offering instant torque, precise handling, and luxurious cabin comfort. Ideal for buyers seeking EV performance without sacrificing refinement.",
    "address": "1 Palm Jumeirah, Abu Dhabi, UAE",
    "city": "Abu Dhabi",
    "country": "UAE",
    "bodyType": "Sedan",
    "price":{
      "rent": 499,
      "sale": 35000
    },
    "specs": {
      "transmission": "Automatic",
      "seats": 4,
      "fuelType": "Hybrid"
    },
    "odometer": 12000,
    "features": ["Rear Camera","Apple CarPlay","Keyless Entry","Adaptive Cruise","Sunroof","Parking Assist"],
    "images": [img8, cImg2, cImg4, cImg3],
    "isAvailable": true,
    "status": "available",
    "createdAt": "2025-04-10T06:29:30.000Z",
    "updatedAt": "2025-04-10T06:29:30.000Z",
    "__v": 0
  },
    {
    "_id": "67f765aa197ac559e4089b9c",
    "agency": dummyAgencyData,
    "title": "Porsche 718 Boxster",
    "description": "Convertible with a refined chassis and retractable top for open-air driving. Comfortable seating for four, responsive handling, and modern infotainment for weekend drives.",
    "address": "1 Palm Jumeirah, Abu Dhabi, UAE",
    "city": "Abu Dhabi",
    "country": "USA",
    "bodyType": "Convertible",
     "price":{
      "rent": 499,
      "sale": 44000
    },
    "specs": {
      "transmission": "Automatic",
      "seats": 4,
      "fuelType": "Electric"
    },
    "odometer": 22500,
    "features": ["Parking Assist","Cruise Control","Rear Camera","Apple CarPlay","Keyless Entry","Heated Seats"],
    "images": [img5, cImg3, cImg2, cImg4],
    "isAvailable": true,
    "status": "available",
    "createdAt": "2025-04-10T06:27:30.013Z",
    "updatedAt": "2025-04-10T06:27:30.013Z",
    "__v": 0
  },

  {
    "_id": "67f765f4197ac559e4089ba4",
    "agency": dummyAgencyData,
    "title": "Mercedes-Benz Sprinter 3500",
    "description": "Utility cargo van designed for trades and deliveries. Large load area, durable interior surfaces, practical access points, and reliable mechanicals for daily work.",
    "address": "88 Willow Lane, Edinburgh, UK",
    "city": "Edinburgh",
    "country": "UK",
    "bodyType": "Van",
    "price":{
      "rent": 199,
      "sale": 22000
    },
    "specs": {
      "transmission": "Dual-clutch",
      "seats": 3,
      "fuelType": "Petrol"
    },
    "odometer": 76000,
    "features": ["Rear Camera","Keyless Entry","Apple CarPlay","Parking Assist","Adaptive Cruise","Cruise Control"],
    "images": [img6, cImg2, cImg3, cImg4],
    "isAvailable": true,
    "status": "available",
    "createdAt": "2025-04-10T06:28:50.013Z",
    "updatedAt": "2025-04-10T06:28:50.013Z",
    "__v": 0
  },


  {
    "_id": "67f7660a197ac559e4089bb0",
    "agency": dummyAgencyData,
    "title": "Lamborghini Huracán EVO",
    "description": "High-revving V10 supercar with razor-sharp handling, lightweight chassis, and premium sporty interior. Built for high-performance driving and track-capable bursts on demand.",
    "address": "10 King's Road, London, UK",
    "city": "London",
    "country": "UK",
    "bodyType": "Coupe",
    "price":{
      "rent": 1200,
      "sale": 44000
    },
    "specs": {
      "transmission": "Dual-clutch",
      "seats": 2,
      "fuelType": "Diesel"
    },
    "odometer": 8500,
    "features": ["Rear Camera","Adaptive Cruise","Heated Seats","Sunroof","Apple CarPlay","Keyless Entry"],
    "images": [img7, cImg3, cImg4, cImg2],
    "isAvailable": true,
    "status": "available",
    "createdAt": "2025-04-10T06:29:10.000Z",
    "updatedAt": "2025-04-10T06:29:10.000Z",
    "__v": 0
  },
  {
    "_id": "67f7666c197ac559e4089bc0",
    "agency": dummyAgencyData,
    "title": "Ferrari F8 Tributo",
    "description": "Mid-engine V8 supercar delivering blistering acceleration and sublime handling. Driver-focused cockpit with premium materials and race-bred technology for an exhilarating experience.",
    "address": "10 Avenue Princesse Grace, Monaco",
    "city": "Monaco",
    "country": "Monaco",
    "bodyType": "Coupe",
    "price":{
      "rent": 1400,
      "sale": 88000
    },
    "specs": {
      "transmission": "Automatic",
      "seats": 2,
      "fuelType": "Petrol"
    },
    "odometer": 7000,
    "features": ["Rear Camera","Parking Assist","Adaptive Cruise","Apple CarPlay","Keyless Entry","Cruise Control"],
    "images": [img9, cImg3, cImg4, cImg2],
    "isAvailable": true,
    "status": "available",
    "createdAt": "2025-04-10T06:29:50.000Z",
    "updatedAt": "2025-04-10T06:29:50.000Z",
    "__v": 0
  },

  {
    "_id": "67f7669d197ac559e4089bc8",
    "agency": dummyAgencyData,
    "title": "McLaren 720S",
    "description": "Lightweight carbon-fiber supercar with a twin-turbo V8, blistering acceleration, and razor-sharp handling. Designed for both road and occasional track use with driver-focused ergonomics.",
    "address": "22 Via dei Condotti, Rome, Italy",
    "city": "Rome",
    "country": "Italy",
    "bodyType": "Coupe",
    "price":{
      "rent": 1300,
      "sale": 72000
    },
    "specs": {
      "transmission": "Manual",
      "seats": 2,
      "fuelType": "Petrol"
    },
    "odometer": 6200,
    "features": ["Rear Camera","Apple CarPlay","Adaptive Cruise","Heated Seats","Sunroof","Cruise Control"],
    "images": [img10, cImg4, cImg3, cImg2],
    "isAvailable": true,
    "status": "available",
    "createdAt": "2025-04-10T06:30:10.000Z",
    "updatedAt": "2025-04-10T06:30:10.000Z",
    "__v": 0
  },
  {
    "_id": "67f766cf197ac559e4089bd0",
    "agency": dummyAgencyData,
    "title": "Aston Martin DB11",
    "description": "Grand tourer combining refined luxury with potent V8/V12 performance. Smooth long-distance cruising, handcrafted interior, and advanced stability for comfortable high-speed touring.",
    "address": "5 Piccadilly, London, UK",
    "city": "London",
    "country": "UK",
    "bodyType": "Grand Tourer",
    "price":{
      "rent": 650,
      "sale": 89000
    },
    "specs": {
      "transmission": "Automatic",
      "seats": 4,
      "fuelType": "Hybrid"
    },
    "odometer": 14000,
    "features": ["Rear Camera","Apple CarPlay","Heated Seats","Adaptive Cruise","Parking Assist","Cruise Control"],
    "images": [img11, cImg3, cImg4, img2],
    "isAvailable": true,
    "status": "available",
    "createdAt": "2025-04-10T06:30:40.000Z",
    "updatedAt": "2025-04-10T06:30:40.000Z",
    "__v": 0
  }
];



// User Bookings Dummy Data
export const dummyBookingsData = [
    {
        "_id": "67f76839994a731e97d3b8ce",
        "user": dummyAgentData,
        "car": dummyCars[1],
        "agency": dummyAgencyData,
        "pickUpDate": "2025-04-30T00:00:00.000Z",
        "dropOffDate": "2025-05-01T00:00:00.000Z",
        "totalPrice": 299,
        "status": "pending",
        "paymentMethod": "Stripe",
        "isPaid": false,
        "createdAt": "2025-04-10T06:42:01.529Z",
        "updatedAt": "2025-04-10T06:43:54.520Z",
        "__v": 0
    },
    {
        "_id": "67f76829994a731e97d3b8c3",
        "user": dummyAgentData,
        "car": dummyCars[0],
        "agency": dummyAgencyData,
        "pickUpDate": "2025-04-27T00:00:00.000Z",
        "dropOffDate": "2025-04-28T00:00:00.000Z",
        "totalPrice": 399,
        "status": "pending",
        "paymentMethod": "Pay at Pick-up",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:45.873Z",
        "updatedAt": "2025-04-10T06:41:45.873Z",
        "__v": 0
    },
    {
        "_id": "67f76810994a731e97d3b8b4",
        "user": dummyAgentData,
        "car": dummyCars[3],
        "agency": dummyAgencyData,
        "pickUpDate": "2025-04-11T00:00:00.000Z",
        "dropOffDate": "2025-04-12T00:00:00.000Z",
        "totalPrice": 199,
        "status": "pending",
        "paymentMethod": "Pay at Pick-up",
        "isPaid": true,
        "createdAt": "2025-04-10T06:41:20.501Z",
        "updatedAt": "2025-04-10T06:41:20.501Z",
        "__v": 0
    }
]


// Blogs Dummy Data with Descriptions
export const blogs = [
  {
    title: "Top 10 Cities to Rent a Car in 2025",
    category: "Travel Trends",
    image: blog1,
    description: "Find out the best cities where renting a car is affordable, convenient, and offers the best travel experience in 2025."
  },
  {
    title: "How to Choose the Right Rental Car",
    category: "Rental Guide",
    image: blog2,
    description: "A step-by-step guide to selecting the perfect rental car based on budget, trip type, and personal preferences."
  },
  {
    title: "Luxury vs Economy Cars: Which One to Rent?",
    category: "Car Comparisons",
    image: blog3,
    description: "Explore the benefits of renting luxury cars versus economy options and decide which suits your journey best."
  },
  {
    title: "First-Time Car Rental Tips You Must Know",
    category: "Beginner Tips",
    image: blog4,
    description: "Essential tips for first-time renters to avoid hidden fees, choose the right insurance, and get the best deals."
  },
  {
    title: "Maximizing Savings on Long-Term Car Rentals",
    category: "Money Saving",
    image: blog5,
    description: "Discover smart strategies to save money and get the best value when renting cars for longer durations."
  },
  {
    title: "Self-Drive vs Chauffeur Cars: Which is Better?",
    category: "Travel Choices",
    image: blog6,
    description: "Understand the pros and cons of renting a self-drive car compared to hiring a chauffeur-driven service."
  },
  {
    title: "How to Book a Rental Car for Road Trips",
    category: "Road Trip Guide",
    image: blog7,
    description: "Learn how to plan and book the right rental car to make your road trips safe, comfortable, and enjoyable."
  },
  {
    title: "2025 Car Rental Industry Trends",
    category: "Market Trends",
    image: blog8,
    description: "An expert overview of the latest car rental market trends, from electric vehicles to flexible rental models."
  },
];



// Dashboard Dummy Data
export const dummyDashboardData = {
    "totalBookings": 3,
    "totalRevenue": 897,
    "bookings": dummyBookingsData
}