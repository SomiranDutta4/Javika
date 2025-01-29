import mongoose from "mongoose";

mongoose.connect('mongodb://localhost/Startup');
const db=mongoose.connection;

db.on('error',console.error.bind(console,"error setting up database"));
db.once('open',function(){console.log('successfully connected to database')});// export const connectDB = async () => {
    // await mongoose.connect('// UR DATABASE WITH ATLAS MONGODB').then(()=>console.log("DataBase Connected"));
// }