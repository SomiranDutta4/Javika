import foodModel from '../models/foodModel.js'
import fs from 'fs'
import Farmer from '../models/farmerModel.js'

// const addFood = async (req, res) => {
//     let image_filename = `${req.file.filename}`;

//     const food = new foodModel({
//         name: req.body.name,
//         description: req.body.description,
//         price: req.body.price,
//         category: req.body.category,
//         image: image_filename
//     })
//     try {
//         await food.save();
//         res.json({ success: true, message: "Food Added" })
//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: "Error" })
//     }
// }

const addFood = async (req, res) => {
    console.log(req.body);
    try {
        const { name, price, category, units, farmer } = req.body;

        const foundFarmer = await Farmer.findOne({ email: farmer.email });
        if (!foundFarmer) {
            return res.status(404).json({ success: false, message: "Farmer not found." });
        }

        let food = await foodModel.findOne({ name, category });

        if (food) {
            let priceEntry = food.prices.find(entry => entry.soldBy.toString() === foundFarmer._id.toString());

            if (priceEntry) {
                // If soldBy already exists, update the units
                priceEntry.units += Number(units);
                priceEntry.price = Number(price); // Optional: update price if needed
            } else {
                // Otherwise, add a new entry
                food.prices.push({ units: Number(units), price: Number(price), soldBy: foundFarmer._id });
            }

            await food.save();
        } else {
            // If food doesn't exist, create a new entry
            food = new foodModel({
                name,
                category,
                prices: [{ units: Number(units), price: Number(price), soldBy: foundFarmer._id }]
            });

            await food.save();
        }

        return res.json({ success: true, message: "Food Added/Updated" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error adding food." });
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

const removeFood = async (req, res) => {
    console.log(req.body)
    try {
        const { id, farmerId } = req.body;

        // Find the food item by ID
        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found." });
        }
        

        // // Find if the farmer exists in the prices array and remove the farmerId
        // const updatedPrices = food.prices.filter(price => price.soldBy.toString() !== farmerId);

        // // If the prices array has changed, update it
        // if (updatedPrices.length !== food.prices.length) {
        //     food.prices = updatedPrices;
        //     await food.save();
        // }

        // // If no farmers remain selling the food, delete the food item
        // if (food.prices.length === 0) {
        //     fs.unlink(`uploads/${food.image}`, () => { }); // Remove the image file
        //     await foodModel.findByIdAndDelete(id);
        //     return res.json({ success: true, message: "Food completely removed" });
        // }

        // return res.json({ success: true, message: "Farmer removed from food item" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error removing farmer from food item." });
    }
};


export { addFood, listFood, removeFood }