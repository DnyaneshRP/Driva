import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import Agency from "../models/Agency.js";
import stripe from "stripe";

// Internal Helper
const checkAvailability = async ({ car, pickUpDate, dropOffDate }) => {
  try {
    const bookings = await Booking.find({
      car,
      pickUpDate: { $lte: dropOffDate },
      dropOffDate: { $gte: pickUpDate },
    });
    const isAvailable = bookings.length === 0;
    return isAvailable;
  } catch (error) {
    console.log(error);
  }
};

// To check Car Availability [POST "/check-availability"]
export const checkBookingAvailability = async (req, res) => {
  try {
    const { car, pickUpDate, dropOffDate } = req.body;
    const isAvailable = await checkAvailability({
      car,
      pickUpDate,
      dropOffDate,
    });
    res.json({ success: true, isAvailable });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Create a New Booking [POST "/book"]
export const bookingCreate = async (req, res) => {
  try {
    const { car, pickUpDate, dropOffDate } = req.body;
    const user = req.user._id;

    const isAvailable = await checkAvailability({
      car,
      pickUpDate,
      dropOffDate,
    });

    if (!isAvailable) {
      return res.json({ success: false, message: "Car is not available" });
    }

    // Get Total Price from Car
    const carData = await Car.findById(car).populate("agency");
    let totalPrice = carData.price.rent;

    // Calculate total price based on days of rent
    const pickUp = new Date(pickUpDate);
    const dropOff = new Date(dropOffDate);
    const timeDiff = dropOff.getTime() - pickUp.getTime();
    const days = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
    totalPrice *= days;

    const booking = await Booking.create({
      user,
      car,
      agency: carData.agency._id,
      pickUpDate,
      dropOffDate,
      totalPrice,
    });

    res.json({ success: true, message: "Booking Created" });
  } catch (error) {
    res.json({ success: false, message: error.message });
    res.json({ success: false, message: "Failed to create booking" });
  }
};

// Get Bookings of Current User [GET "/user"]
export const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const bookings = await Booking.find({ user })
      .populate("car agency")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    res.json({ success: false, message: "Failed to get bookings" });
  }
};

// Get Bookings for Agency [GET "/agency"]
export const getAgencyBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const agency = await Agency.findOne({ owner: req.auth().userId });
    if (!agency) {
      return res.json({ success: false, message: "No Agency found" });
    }
    const bookings = await Booking.find({ agency: agency._id })
      .populate("car agency user")
      .sort({ createdAt: -1 });
    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce(
      (acc, b) => acc + (b.isPaid ? b.totalPrice : 0),
      0,
    );
    res.json({
      success: true,
      dashboardData: { totalBookings, totalRevenue, bookings },
    });
  } catch (error) {
    res.json({ success: false, message: "Failed to get Agency bookings" });
  }
};

// Stripe Payment [POST "/stripe"]
export const bookingStripePayment = async (req,res)=> {
    try {
        
    } catch (error) {
        
    }
}
