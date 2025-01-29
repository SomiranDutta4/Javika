import express from "express"
const farmerRoute=express.Router();
import {loginFarmer,createFarmer,findAllFood} from '../controllers/farmerController.js'

farmerRoute.get('/foods/All',findAllFood);
farmerRoute.post('/signUp',createFarmer)
farmerRoute.post('/login',loginFarmer)

export default farmerRoute