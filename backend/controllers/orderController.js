import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import farmerModel from '../models/farmerModel.js'
import Stripe from "stripe"
import foodModel from "../models/foodModel.js";
import listingModel from '../models/listingModel.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// // placing user order from frontend
// name: { type: String, required: true },
// description: { type: String, required: true },
// // image: { type: String, required: true },
// category: { type: String, required: true },
// prices: [
//     {
//         units:{type:Number,required:true,default:0},
//         price: { type: Number, required: true },
//         soldBy: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true }
//     }
// ]
// const placeOrder = async (req,res) => {

// const FarmerSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     location: { type: String, required: true },
//     farmerId: { type: String, required: true},
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     products: [
//       {
//         foodId:{type:String,required:true},
//         units: { type: Number, required: true },
//         price: { type: Number, required: true },
//         category:{type:String,required:true},
//         name:{type:String,required:true},
//         // soldBy: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true }
//       }
//     ],
//     aadhaar: { type: String, required: true, unique: true }, // Changed to camelCase
//     panNumber: { type: String, required: true, unique: true }, // Changed to camelCase
//   },
//   { timestamps: true }
// );


// const placeOrder = async (req, res) => {
//     try {
//         const orders = req.body.orders; // Orders object from request body
//         const farmerIds = Object.keys(orders); // Extract keys (farmer IDs)

//         const orderResults = [];

//         for (const farmerId of farmerIds) {
//             const farmer = await farmerModel.findById(farmerId);
//         }

//         res.status(200).json({ success: true, orders: orderResults });
//     } catch (error) {
//         console.error("Error placing order:", error);
//         res.status(500).json({ success: false, message: "Internal server error" });
//     }
// };

// const placeOrder = async (cartItems) => {
//     try {
//         if (!cartItems || typeof cartItems !== "object") {
//             return { success: false, message: "Invalid cart data" };
//         }

//         for (const [productId, item] of Object.entries(cartItems)) {
//             if (!item || typeof item !== "object") continue; // Skip invalid items

//             const { units, productId: foodId } = item;
//             if (!units || !foodId) continue; // Ensure required fields exist

//             // Update Farmer's stock
//             const farmer = await farmerModel.findOne({ "products.foodId": foodId });
//             if (!farmer) continue; // Skip if farmer not found

//             const productIndex = farmer.products.findIndex(p => p.foodId === foodId);
//             if (productIndex !== -1) {
//                 farmer.products[productIndex].units = Math.max(0, farmer.products[productIndex].units - units);
//             }
//             await farmer.save();

//             // Update Food stock
//             const foodItem = await foodModel.findOne({ _id: foodId });
//             if (!foodItem) continue; // Skip if food item not found

//             const priceIndex = foodItem.prices.findIndex(p => p.soldBy.toString() === farmer._id.toString());
//             if (priceIndex !== -1) {
//                 foodItem.prices[priceIndex].units = Math.max(0, foodItem.prices[priceIndex].units - units);
//             }
//             await foodItem.save();
//         }

//         return { success: true, message: "Purchase processed successfully." };
//     } catch (error) {
//         console.error(error);
//         return { success: false, message: "Server error", error };
//     }
// };
const placeOrder = async (req, res) => {
    const { user, cartItems, address, amount, paymentMethod } = req.body;
    const userFound = await userModel.findById(user._id);


    if (!user || !cartItems || cartItems.length === 0 || !address || !amount) {
        return res.status(400).json({ success: false, message: "Invalid order data." });
    }
    for (const cartItem of cartItems) {
        const { listing, units } = cartItem;

        // Find the listing by ID
        let listingData = await listingModel.findById(listing._id);

        if (!listingData) {
            return res.status(404).json({ success: false, message: `Listing not found: ${listing._id}` });
        }

        // Ensure enough stock is available
        if (listingData.units < units) {
            cartItem.units = listingData.units;

            // Set stock to zero since all available units are used
            listingData.units = 0;
            // return res.status(400).json({ success: false, message: `Not enough stock for listing ${listing._id}` });
        }
        await new orderModel({
            userId: req.body.user._id,
            farmerId: listing.farmerId,
            item: listing.foodId._id,
            units: units,
            amount: req.body.amount,
            address: req.body.address,
            status: "Waiting for farmer's acceptance",
            date: new Date(),
            payment: false
        }).save()

        // Reduce the units by the amount in cart
        listingData.units -= units;

        // Save the updated listing
        await listingData.save();
    }
    userFound.cartData = [];
    userFound.save()
    return res.status(200).json({ success: true, message: "successfully bought" })
}

// import mongoose from "mongoose"

// const orderSchema = new mongoose.Schema({
//     userId:{type:mongoose.Schema.Types.ObjectId, ref: "user",required:true},
//     farmerId:{type:mongoose.Schema.Types.ObjectId, ref: "Farmer",required:true},
//     item:{type:mongoose.Schema.Types.ObjectId, ref: "food",required:true},
//     amount:{type:Number,required:true},
//     address:{type:Object,required:true},
//     status:{type:String,default:"Food Processing"},
//     date:{type:Date,default:Date.now()},
//     payment:{type:Boolean,default:false},
//     review:{type:Number}
// })

// const orderModel = mongoose.models.order || mongoose.model("order",orderSchema)
// export default orderModel;


// try {
//     const orders = req.body.orders; // Orders object from request body
//     const farmerIds = Object.keys(orders); // Extract keys (farmer IDs)

//     const orderResults = [];

//     for (const farmerId of farmerIds) {
//         const farmer = await farmerModel.findById(farmerId);
//     }

//     res.status(200).json({ success: true, orders: orderResults });
// } catch (error) {
//     console.error("Error placing order:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
// }


//     const frontend_url = "http://localhost:5173";

//     try {
//         const newOrder = new orderModel({
//             userId:req.body.userId,
//             items:req.body.items,
//             amount:req.body.amount,
//             address:req.body.address
//         })
//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

//         const line_items = req.body.items.map((item)=>({
//             price_data:{
//                 currency:"ron",
//                 product_data:{
//                     name:item.name
//                 },
//                 unit_amount:item.price*100*80
//             },
//             quantity:item.quantity
//         }))

//         line_items.push({
//             price_data:{
//                 currency:"ron",
//                 product_data:{
//                     name:"Delivery Charges"
//                 },
//                 unit_amount:2*100*80
//             },
//             quantity:1
//         })

//         const session = await stripe.checkout.sessions.create({
//             line_items:line_items,
//             mode:'payment',
//             success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//         })

//         res.json({success:true,session_url:session.url})

//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}


// user orders for frontend

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.user._id })
            .populate('item');
        res.json({ success: true, orders: orders.reverse() }); // Reverse the orders before sending
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Listing orders for admin panel
// const listOrders = async (req, res) => {
//     console.log(req.body)
//     try {
//         const orders = await orderModel.find({farmerId:req.body.farmer});
//         res.json({ success: true, data: orders })
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" })
//     }
// }
const listOrders = async (req, res) => {
    try {
        const { farmerId } = req.query; // Get farmerId from query parameters

        if (!farmerId) {
            return res.status(400).json({ success: false, message: "Farmer ID is required" });
        }

        const orders = await orderModel.find({ farmerId }).sort({ createdAt: -1 }); // Sort by createdAt (newest first)

        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Error fetching orders" });
    }
};


// api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}
const rateOrder = async (req, res) => {
    try {
        const { orderId, rating } = req.body;

        // Find the order by ID and populate the item field
        const order = await orderModel.findById(orderId).populate("item");
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        if (order.status !== "Delivered") {
            return res.status(400).json({ success: false, message: "Only delivered orders can be rated." });
        }

        // Update the order rating
        order.rating = rating;
        await order.save();

        // Find the corresponding listing based on foodId and farmerId
        const listing = await listingModel.findOne({ foodId: order.item._id, farmerId: order.farmerId });
        if (!listing) {
            return res.status(404).json({ success: false, message: "Listing not found for this order." });
        }

        // Calculate the new rating
        const newListingRating = (listing.ratings * listing.ratedBy + rating) / (listing.ratedBy + 1);

        // Update listing ratings and increment ratedBy
        listing.ratings = newListingRating;
        listing.ratedBy += 1;
        await listing.save();

        res.json({ success: true, message: "Rating submitted successfully", newListingRating });

    } catch (error) {
        console.error("Error updating rating:", error);
        res.status(500).json({ success: false, message: "Error submitting rating" });
    }
}


export { rateOrder, placeOrder, verifyOrder, userOrders, listOrders, updateStatus }