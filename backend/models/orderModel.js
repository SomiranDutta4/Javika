import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    units: { type: Number },
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true },
    item: { type: mongoose.Schema.Types.ObjectId, ref: "food", required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Food Processing" },
    payment: { type: Boolean, default: false },
    rating: { type: Number, required: true, default: 0 }
}, { timestamps: true }); // Enable automatic createdAt & updatedAt

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
