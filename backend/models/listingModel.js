import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    farmerId:{type:mongoose.Schema.Types.ObjectId, ref: "Farmer",required:true},
    foodId:{type:mongoose.Schema.Types.ObjectId, ref: "food",required:true},
    price:{type:Number,required:true},
    units:{type:Number,required:true},
    ratings:{type:Number,required:true,default:0},
    orderedBy:{type:Number,required:true,default:0},
    ratedBy:{type:Number,required:true,default:0}
});

const listingModel = mongoose.models.Listing || mongoose.model("Listing", listingSchema)

export default listingModel;