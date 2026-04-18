import express from "express";
import { bookingCreate, bookingStripePayment, checkBookingAvailability, getAgencyBookings, getUserBookings } from "../controllers/bookingController.js";
import { authUser } from "../middleware/authMiddleware.js";

const bookingRouter = express.Router()

bookingRouter.post("/check-availability", checkBookingAvailability)
bookingRouter.post("/book", authUser, bookingCreate)
bookingRouter.get("/user", authUser, getUserBookings)
bookingRouter.get("/agency", authUser, getAgencyBookings)
bookingRouter.post("/stripe", authUser, bookingStripePayment)

export default bookingRouter