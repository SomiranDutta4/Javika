import userModel from "../models/userModel.js"

// add items to user cart
// const addToCart = async (req, res) => {
//     // if (!req.body.currPrice) {
//     //     return res.status(400).json({ message: "error" })
//     // }
//     try {
//         let userData = await userModel.findById(req.body.user._id);
//         let cartData = await userData.cartData;
//         if (!cartData[req.body.selectedItem._id]) {
//             cartData[req.body.selectedItem._id] = {
//                 // listingId:req.body.selectedItem._id,
//                 // farmerId: req.body.selectedItem._id,
//                 // productId: req.body.foodItem._id,
//                 // name: req.body.foodItem.name,
//                 // imageUrl: req.body.foodItem.image,
//                 // price: req.body.selectedItem.price,
//                 units: 1
//             };
//         }
//         else {
//             cartData[req.body.selectedItem._id] = {
//                 // name: req.body.foodItem.name,
//                 // price: cartData[req.body.selectedItem._id].price + req.body.currPrice,
//                 // imageUrl: req.body.foodItem.image,
//                 units: cartData[req.body.selectedItem._id].units + 1,
//                 // farmerId: req.body.selectedItem._id,
//                 // productId: req.body.foodItem._id
//             };
//         }
//         await userModel.findByIdAndUpdate(req.body.user._id, { cartData })
//         res.json({ success: true, message: "Added to cart" });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" })
//     }
// }
const addToCart = async (req, res) => {
    try {
        const { user, selectedItem } = req.body;

        if (!user || !selectedItem || !selectedItem._id) {
            return res.status(400).json({ success: false, message: "Invalid request data" });
        }

        let userData = await userModel.findById(user._id);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || [];

        // Check if the item is already in the cart
        let cartItem = cartData.find(item => item.listing.toString() === selectedItem._id);

        if (cartItem) {
            // Update existing item units
            cartItem.units += 1;
        } else {
            // Add new item to cart
            cartData.push({
                listing: selectedItem._id, // Reference to the listing (food item)
                units: 1
            });
        }

        // Update the user's cart in the database
        await userModel.findByIdAndUpdate(user._id, { $set: { cartData } });

        res.json({ success: true, message: "Added to cart" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding to cart" });
    }
};

// const removeFromCart = async (req, res) => {
//     if (!req.body.currPrice) {
//         return res.status(400).json({ message: "error" })
//     }
//     try {
//         let userData = await userModel.findById(req.body.user._id);
//         let cartData = await userData.cartData;

//         // Access the correct item using the foodItem._id (since productId isn't being used anymore)
//         if (cartData[req.body.selectedItem._id] && cartData[req.body.selectedItem._id].units > 0) {
//             cartData[req.body.selectedItem._id] = {
//                 // name: req.body.foodItem.name,
//                 // price: cartData[req.body.selectedItem._id].price - req.body.currPrice,
//                 // imageUrl: req.body.foodItem.image,
//                 units: cartData[req.body.selectedItem._id].units - 1,
//                 // productId: req.body.foodItem._id
//                 // farmerId: req.body.selectedItem._id, // Ensure the farmerId is updated correctly
//             };

//             // If units are 0 after decrement, remove the item from the cart
//             if (cartData[req.body.selectedItem._id].units === 0) {
//                 delete cartData[req.body.selectedItem._id];
//             }
//         }

//         // Update the cart data in the database
//         await userModel.findByIdAndUpdate(req.body.user._id, { cartData });

//         res.json({ success: true, message: "Removed from cart" });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" });
//     }
// };
const removeFromCart = async (req, res) => {
    try {
        const { user, selectedItem } = req.body;

        if (!user || !selectedItem || !selectedItem._id) {
            return res.status(400).json({ success: false, message: "Invalid request data" });
        }

        let userData = await userModel.findById(user._id);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || [];

        // Find the item in the cart
        let cartItemIndex = cartData.findIndex(item => item.listing.toString() === selectedItem._id);

        if (cartItemIndex === -1) {
            return res.status(400).json({ success: false, message: "Item not found in cart" });
        }

        // Decrease units or remove item if units reach 0
        if (cartData[cartItemIndex].units > 1) {
            cartData[cartItemIndex].units -= 1;
        } else {
            cartData.splice(cartItemIndex, 1); // Remove item from array
        }

        // Update the cart in the database
        await userModel.findByIdAndUpdate(user._id, { $set: { cartData } });

        res.json({ success: true, message: "Removed from cart" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error removing from cart" });
    }
};

const removeCart = async (req, res) => {
    try {
        let user = await userModel.findById(req.body.user._id);
        let cartData = await user.cartData;
        let cartItemIndex = cartData.findIndex(item => item.listing.toString() === req.body.itemId);
        if (cartItemIndex === -1) {
            return res.status(400).json({ success: false, message: "Item not found in cart" });
        }
        cartData.splice(cartItemIndex, 1);
        await userModel.findByIdAndUpdate(user._id, { $set: { cartData } });
        res.json({ success: true, message: "Item removed from cart", cartData });

        // if (cartData[req.body.itemId].units && cartData[req.body.itemId].units > 0) {
        //     delete cartData[req.body.itemId];
        // }
        // await userModel.findByIdAndUpdate(req.body.user._id, { cartData });
    } catch (error) {
        console.log(error)
    }
}
// fetch user cart datae
const getCart = async (req, res) => {
    console.log(req.body.user._id)
    try {
        let userData = await userModel.findById(req.body.user._id)
            .populate({
                path: 'cartData.listing',  // Populate listing inside cartData
                populate: {
                    path: 'foodId',  // Populate foodId inside listing
                    model: 'food'   // Ensure it references the correct model name
                }
            });
        let cart = userData.cartData;
        res.json({ success: true, cart })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
    // userId:{type:String,required:true},
    // farmerId:{type:String,required:true},
    // item:{type:Array,required:true},
    // amount:{type:Number,required:true},
    // address:{type:Object,required:true},
    // status:{type:String,default:"Food Processing"},
    // date:{type:Date,default:Date.now()},
    // payment:{type:Boolean,default:false}
}

export { addToCart, removeFromCart, getCart, removeCart }