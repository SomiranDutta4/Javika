import foodModel from "../models/foodModel";

module.exports.findAllFood = async () => {
    try {
        let foods = await foodModel.find()
        return response.status(200).json(foods)
    } catch (error) {
        return response.status(500).json(null,message='some error')
    }
}

