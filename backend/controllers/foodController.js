import foodModel from '../models/foodModel.js'
import fs from 'fs'
import Farmer from '../models/farmerModel.js'
import listingModel from '../models/listingModel.js';



// const addFood = async (req, res) => {
//     try {
//         const { name, price, category, units, farmer } = req.body;

//         const foundFarmer = await Farmer.findById(farmer._id);
//         if (!foundFarmer) {
//             return res.status(404).json({ success: false, message: "Farmer not found." });
//         }
//         let food = await foodModel.findOne({ name, category });
//         if (food) {
//             const productIndex = foundFarmer.products.findIndex(product => product.foodId.toString() === food._id.toString())

//             if (productIndex !== -1) {
//                 foundFarmer.products[productIndex].units += units; // Adding units
//                 foundFarmer.products[productIndex].price = price; // Updating price

//                 // Save the updated farmer document
//                 await foundFarmer.save();

//                 // return res.status(200).json({ message: 'Product updated successfully' });
//             } else {
//                 // If food doesn't exist in the farmer's products, add it
//                 foundFarmer.products.push({
//                     foodId: food._id,
//                     units: units,
//                     price: price,
//                     category: category,
//                     name: food.name,
//                 });
//                 await foundFarmer.save();
//             }

//             let priceEntry = food.prices.find(entry => entry.soldBy.toString() === foundFarmer._id.toString());

//             if (priceEntry) {
//                 // If soldBy already exists, update the units
//                 priceEntry.units += Number(units);
//                 priceEntry.price = Number(price); // Optional: update price if needed
//             } else {
//                 // Otherwise, add a new entry
//                 food.prices.push({ units: Number(units), price: Number(price), soldBy: foundFarmer._id });
//             }
//             await food.save();
//         } else {
//             food = new foodModel({
//                 name,
//                 category,
//                 prices: [{ units: Number(units), price: Number(price), soldBy: foundFarmer._id }]
//             });

//             await food.save();
//         }

//         return res.json({ success: true, message: "Food Added/Updated" });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ success: false, message: "Error adding food." });
//     }
// };
const addFood = async (req, res) => {
    try {
        const { name, price, category, units, farmer } = req.body;

        // Find the farmer
        const foundFarmer = await Farmer.findById(farmer._id);
        if (!foundFarmer) {
            return res.status(404).json({ success: false, message: "Farmer not found." });
        }

        // Find the food item
        let food = await foodModel.findOne({ name, category });
        if (!food) {
            // Create new food entry if not found
            food = new foodModel({ name, category });
            await food.save();
        }
        food.units += Number(units)
        food.save()

        // Check if a listing already exists for this farmer and food
        let listing = await listingModel.findOne({ farmerId: foundFarmer._id, foodId: food._id });

        if (listing) {
            // Update existing listing
            listing.units += Number(units);
            listing.price = Number(price); // Update price if needed
            await listing.save();
        } else {
            // Create new listing
            listing = new listingModel({
                farmerId: foundFarmer._id,
                foodId: food._id,
                price: Number(price),
                units: Number(units)
            });
            await listing.save();
        }

        return res.json({ success: true, message: "Food listing updated successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error adding/updating food listing." });
    }
};
// const addFood = async (req, res) => {
//     console.log(req.body)
//     try {
//         const { name, price, category, units, farmer } = req.body;
//         // let image_filename = req.file ? req.file.filename : "";

//         const foundFarmer = await Farmer.findOne({ email: farmer.email });
//         if (!foundFarmer) {
//             return res.status(404).json({ success: false, message: "Farmer not found." });
//         }
//         const food = await foodModel.findOne({
//             "name": name,
//             "category": category
//         })
//         if (food) {
//             console.log(food)
//             food.prices.push({ units,price, soldBy: foundFarmer._id });
//             await food.save()
//         }
//         // const food = new foodModel({
//         //     name,
//         //     description,
//         //     image: image_filename,
//         //     category,
//         //     prices: [{ units,price, soldBy: foundFarmer._id }]
//         // });

//         // await food.save();
//         return res.json({ success: true, message: "Food Added" });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ success: false, message: "Error adding food." });
//     }
// };


const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const findOneFood = async (req, res) => {
    console.log(req.body)
    try {
        const food = await foodModel.findById(req.body.foodId)
        // .populate("prices.soldBy")
        const listed = await listingModel.find({ foodId: req.body.foodId })
            .populate('farmerId');


        if (!food) {
            return res.status(404).json({ message: "Food not found" });
        }

        res.status(200).json({ food, listed }); // Ensure response format matches frontend expectation
    } catch (error) {
        console.error("Error fetching food:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// remove food item
// const removeFood = async (req, res) => {
//     console.log(req.body

//     )
//     try {
//         const food = await foodModel.findById(req.body.id);
//         fs.unlink(`uploads/${food.image}`, () => { })

//         await foodModel.findByIdAndDelete(req.body.id);
//         res.json({ success: true, message: "Food Removed" })
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error" })
//     }
// }

// const removeFood = async (req, res) => {
//     try {
//         const id = req.body.id;
//         const farmerId = req.body.farmer._id;

//         // Find the food item by ID
//         const food = await foodModel.findById(id);
//         if (!food) {
//             return res.status(404).json({ success: false, message: "Food not found." });
//         }
//         const farmer = await Farmer.findById(req.body.farmer._id);
//         const updatedFarmer = await Farmer.findByIdAndUpdate(
//             farmer._id,
//             { $pull: { products: { foodId: id } } },
//             { new: true } // This option returns the updated farmer
//         );
//         const newProducts = updatedFarmer.products

//         // Find if the farmer exists in the prices array and remove the farmerId
//         const updatedPrices = food.prices.filter(price => price.soldBy.toString() !== farmerId);

//         // If the prices array has changed, update it
//         if (updatedPrices.length !== food.prices.length) {
//             food.prices = updatedPrices;
//             await food.save();
//         }


//         return res.json({ success: true, message: "Farmer removed from food item", newProducts });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ success: false, message: "Error removing farmer from food item." });
//     }
// };
const removeFood = async (req, res) => {
    try {
        const id = req.body.id;
        const farmerId = req.body.farmer._id;
        const listing = await listingModel.findOne({ foodId: id, farmerId });

        if (!listing) {
            return res.status(400).json({ success: false, message: "Listing not found for this farmer." });
        }
        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found." });
        }
        food.units-=listing.units;
        food.save()

        // Delete the listing
        await listingModel.deleteOne({ foodId: id, farmerId });

        // const listing = await listingModel.findOneAndDelete({ foodId: id, farmerId });
        // if (!listing) {
        //     return res.status(404).json({ success: false, message: "Listing not found for this farmer." });
        // }
        // await listing.save();

        return res.status(200).json({ success: true, message: "Listing updated, units set to zero." });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error updating food listing." });
    }
};


export { addFood, listFood, removeFood, findOneFood }