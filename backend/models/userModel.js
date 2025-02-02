import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: [
        {
            listing: { type: mongoose.Schema.Types.ObjectId, ref: "Listing", required: true },
            units: { type: Number, required: true, default: 0 }
        }
    ]
}, { minimize: false });



const userModel = mongoose.models.user || mongoose.model("user", userSchema)
export default userModel;