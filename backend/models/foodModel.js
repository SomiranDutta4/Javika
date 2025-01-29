import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    prices: [
        {
            units:{type:Number,required:true,default:0},
            price: { type: Number, required: true },
            soldBy: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true }
        }
    ]
});

const foodModel = mongoose.models.food || mongoose.model("food",foodSchema)

export default foodModel;