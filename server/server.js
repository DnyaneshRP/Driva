import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from "./controllers/clerkWebhooks.js";

await connectDB() // Establish connection to the database

const app = express() // Initialize Express Application
app.use(cors()) // Enables Cross-Origin Resource Sharing

// Middleware Setup
app.use(express.json()) // Enables JSON request body parsing
app.use(clerkMiddleware())

// API to listen Clerk Webhooks
app.use("/api/clerk", clerkWebhooks)

// Route Endpoint to check API status
app.get('/', (req, res)=> res.send("API Successfully Connected"))

const port = process.env.PORT || 4000 // Define server port

// Start the Server
app.listen(port, ()=> console.log(`Server is running at http://localhost:${port}`))