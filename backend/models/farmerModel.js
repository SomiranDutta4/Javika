import mongoose from "mongoose";

const FarmerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    farmerId: { type: String, required: true, unique: true }, // Ensure farmerId is unique
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    aadhaar: { type: String, required: true, unique: true }, // Changed to camelCase
    panNumber: { type: String, required: true, unique: true }, // Changed to camelCase
  },
  { timestamps: true }
);

// Register the model
const Farmer = mongoose.models.Farmer || mongoose.model("Farmer", FarmerSchema);

export default Farmer;
