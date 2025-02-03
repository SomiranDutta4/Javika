import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    units:{type:Number,required:true,default:0},
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    marketPrice:{type:Number,required:true,default:100}
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema)

export default foodModel;