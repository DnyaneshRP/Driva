import User from "../models/User.js";
import Agency from "../models/Agency.js";

// Register a New Agency for the logged in user [POST "/agencies"]
export const agencyReg = async (req,res)=>{
    try {
        const {name, email, address, contact, city} = req.body
        const owner = req.user._id

        // Check if user has already an agency registered
        const agency = await Agency.findOne({owner})
        if(agency) {
            return res.json({success:false, message: "Agency already registered"})
        }

        await Agency.create({name, email, address, contact, city, owner})
        await User.findByIdAndUpdate(owner, {role:"agencyOwner"})

        res.json({success:true, message:"Agency Registered Successfully"})

    } catch (error) {
        res.json({success:false, message:error.message})
    }
}