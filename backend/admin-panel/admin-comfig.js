import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import Farmer from "../models/farmerModel.js";
import foodModel from "../models/foodModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const ADMINPANELROOT =   "/admin";

const DEFAULT_ADMIN = {
  email:'g.avinash@iitg.ac.in',
  password:'admin',
};
console.log(DEFAULT_ADMIN);

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return DEFAULT_ADMIN;
  }
  return null;
};


const adminOptions = {
  resources: [
    Farmer,
    foodModel,
    orderModel,
    userModel

  ],
  rootPath: ADMINPANELROOT,
  loginPath: ADMINPANELROOT + "/login",
  logoutPath: ADMINPANELROOT + "/logout"
};

const admin = new AdminJS(adminOptions);

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
  authenticate,
  cookieName: "adminjs",
  cookiePassword: "sessionsecret",
}, null, {
  resave: false,
  saveUninitialized: true,
  secret: "sessionsecret",
});

export {adminRouter}