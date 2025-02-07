import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI).then(result => {
    console.log('mongoDB set up')
}).catch(err => {
    console.log('error in DB connection:', err)
})
;
const db = mongoose.connection;

db.on('error', console.error.bind(console, "error setting up database"));
db.once('open', function () { console.log('successfully connected to database') });// export const connectDB = async () => {
// await mongoose.connect('// UR DATABASE WITH ATLAS MONGODB').then(()=>console.log("DataBase Connected"));
// }