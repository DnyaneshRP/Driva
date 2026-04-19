import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoute.js";
import agencyRouter from "./routes/agencyRoute.js";
import connectCloudinary from "./config/cloudinary.js";
import carRouter from "./routes/carRoute.js";
import bookingRouter from "./routes/bookingRoute.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

await connectDB() // Establish connection to the database
await connectCloudinary() // Setup Cloudinary for image storage

const app = express() // Initialize Express Application
app.use(cors()) // Enables Cross-Origin Resource Sharing

// API to listen stripe webhooks
app.post('/api/stripe', express.raw({type: "application/json"}), stripeWebhooks)

// Middleware Setup
app.use(express.json()) // Enables JSON request body parsing
app.use(clerkMiddleware())

// API to listen Clerk Webhooks
app.use("/api/clerk", clerkWebhooks)

// Define API routes
app.use('/api/user', userRouter)
app.use('/api/agencies', agencyRouter)
app.use('/api/cars', carRouter)
app.use('/api/bookings', bookingRouter)

// Route Endpoint to check API status
app.get('/', (req, res)=> res.send("API Successfully Connected"))

const port = process.env.PORT || 4000 // Define server port

// Start the Server
app.listen(port, ()=> console.log(`Server is running at http://localhost:${port}`))