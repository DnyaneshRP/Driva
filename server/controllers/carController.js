import { v2 as cloudinary } from "cloudinary";
import Agency from "../models/Agency.js";
import Car from "../models/Car.js";
import { populate } from "dotenv";

// Create a New Car [POST "/cars"]
export const addNewCar = async (req, res) => {
  try {
    const {
      title,
      description,
      city,
      country,
      address,
      odometer,
      bodyType,
      priceRent,
      priceSale,
      transmission,
      seats,
      fuelType,
      features,
    } = req.body;

    const agency = await Agency.findOne({ owner: req.auth().userId });

    if (!agency) {
      return res.json({ success: false, message: "Agency not found" });
    }

    // Upload images to cloudinary
    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });

    // Waiting for uploads to complete
    const images = await Promise.all(uploadImages);

    await Car.create({
      agency: agency._id,
      title,
      description,
      city,
      country,
      address,
      odometer,
      bodyType,
      price: {
        rent: priceRent ? +priceRent : null,
        sale: priceSale ? +priceSale : null,
      },
      specs: {
        transmission,
        seats: +seats,
        fuelType,
      },
      features: JSON.parse(features),
      images,
    });

    res.json({ success: true, message: "Car Added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get all Available Cars [GET "/cars"]
export const getAllAvailableCars = async (req, res) => {
  try {
    const cars = await Car.find({ isAvailable: true }).populate({
      path: "agency",
      populate: {
        path: "owner",
        select: "image email",
      },
    });

    res.json({ success: true, cars });
  } catch (error) {
    res.json({ success: false, message: error.message });

  }
};

// Get cars of the logged in agency owner [GET "/cars/owner"]
export const getOwnerCars = async (req, res) => {
  try {
    const agencyData = await Agency.findOne({ owner: req.auth().userId });
    const cars = await Car.find({
      agency: agencyData._id.toString(),
    }).populate("agency");
    res.json({ success: true, cars });
  } catch (error) {
    res.json({ success: false, message: error.message });

  }
};

// Toggle Availability Status of a car [POST "/cars/toggle-availability"]
export const toggleCarAvailability = async (req, res) => {
  try {
    const { carId } = req.body;
    const carData = await Car.findById(carId);
    carData.isAvailable = !carData.isAvailable;
    await carData.save();

    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });

  }
};
