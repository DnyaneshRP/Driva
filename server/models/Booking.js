import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    user:{type:String, required:true},
    car:{type:String, ref:"Car", required:true},
    agency:{type:String, ref:"Agency", required:true},
    pickUpDate:{type:Date, required:true},
    dropOffDate:{type:Date, ref:"User", required:true},
    totalPrice:{type:Number, required:true},
    status:{type:String, enum:["pending", "confirmed", "cancelled"], default:"pending"},
    paymentMethod:{type:String, required:true, default:"Pay at pickup"},
    isPaid:{type:Boolean, default:false},
}, {timestamps: true})

const Booking = mongoose.model("Booking", bookingSchema)

export default Booking