import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    farmerId:{type:mongoose.Schema.Types.ObjectId, ref: "Farmer",required:true},
    foodId:{type:mongoose.Schema.Types.ObjectId, ref: "food",required:true},
    price:{type:Number,required:true},
    units:{type:Number,required:true},
});

const listingModel = mongoose.models.Listing || mongoose.model("Listing", listingSchema)

export default listingModel;