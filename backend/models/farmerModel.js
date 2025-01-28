import mongoose from "mongoose"

const FarmerSchema = new mongoose.Schema({
    name:{type:String,required:true},
    location:{type:String,required:true},
    farmerId:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    ADHAAR:{type:String,required:true},
    PanNumber:{type:String,required:true},
},{timestamps:true})

const Farmer = mongoose.models.user || mongoose.model("user", FarmerSchema)
export default Farmer;