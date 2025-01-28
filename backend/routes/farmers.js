import express from "express"
const farmerRoute=express.Router();
const farmerController=require('../controllers/farmerController')

farmerRoute.get('/foods/All',farmerController.findAllFood);
