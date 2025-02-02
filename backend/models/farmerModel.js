import mongoose from "mongoose";

const FarmerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    farmerId: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // products: [
    //   {
    //     foodId:{type:String,required:true},
    //     units: { type: Number, required: true },
    //     price: { type: Number, required: true },
    //     category:{type:String,required:true},
    //     name:{type:String,required:true},
    //     // soldBy: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true }
    //   }
    // ],
    aadhaar: { type: String, required: true, unique: true }, // Changed to camelCase
    panNumber: { type: String, required: true, unique: true }, // Changed to camelCase
  },
  { timestamps: true }
);

// Register the model
const Farmer = mongoose.models.Farmer || mongoose.model("Farmer", FarmerSchema);

export default Farmer;
