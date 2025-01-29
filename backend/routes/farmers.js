import express from "express"
const farmerRoute=express.Router();
import {loginFarmer,createFarmer,findAllFood,getFarmerFoods} from '../controllers/farmerController.js'

farmerRoute.get('/foods/All',findAllFood);
farmerRoute.post('/signUp',createFarmer)
farmerRoute.post('/login',loginFarmer)
farmerRoute.put('/products/All',getFarmerFoods)

export default farmerRoute