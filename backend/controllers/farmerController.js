import foodModel from "../models/foodModel.js";
import Farmer from "../models/farmerModel.js";
import listingModel from "../models/listingModel.js";

const findAllFood = async function (req, res) {
    try {
        let foods = await foodModel.find()
        return res.status(200).json(foods)
    } catch (error) {
        return res.status(500).json(null, message = 'some error')
    }
}


import bcrypt from "bcrypt";

const createFarmer = async function(req, res) {
    const { name, email, password, aadhaar, location, panNumber } = req.body;
    try {
        // Validate required fields
        if (!name || !email || !password || !aadhaar || !location || !panNumber) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }
        const existingFarmer = await Farmer.findOne({email });

        if (existingFarmer) {
            return res.status(400).json({ success: false, message: "Email already exists." });
        }


        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newFarmer = await Farmer.create({
            name,
            email,
            password: hashedPassword,
            farmerId:1003,
            aadhaar,
            location,
            panNumber
        });

        return res.status(201).json({ success: true, message: "Farmer created successfully!", farmer: newFarmer });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
    }
};
const getFarmerFoods=async function(req,res){
    const listings=await listingModel.find({farmerId:req.body._id})
    .populate('foodId')
    return res.status(200).json(listings)
}

const decreaseItems=async(req,res)=>{
    // const listings=listingModel.find({farmerId:req.body.farmer._id})

}

const getFarmerOrders=async function(req,res){
    
}

const loginFarmer = async function (req, res) {
    try {
        const { email, password, farmerId } = req.body;

        // Validate required fields
        if (!email || !password || !farmerId) {
            return res.status(400).json({ error: "email, Password, and Farmer ID are required." });
        }

        // Check if the farmer exists in the database
        const farmer = await Farmer.findOne({ email, farmerId });
        if (!farmer) {
            return res.status(404).json({ error: "Farmer not found. Please check your credentials." });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, farmer.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password. Please try again." });
        }

        // Respond with success and farmer details
        res.status(200).json({
            message: "Login successful!",
            farmer: {
                _id:farmer._id,
                name: farmer.name,
                farmerId: farmer.farmerId,
                email: farmer.email,
                location: farmer.location,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred. Please try again later." });
    }
};


export { loginFarmer, createFarmer, findAllFood ,getFarmerFoods}