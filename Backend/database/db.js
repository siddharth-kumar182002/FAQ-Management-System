import mongoose from "mongoose";
import dotenv from 'dotenv';


const MONGO_URI = process.env.MONGO_URI;

const connectToMongo=async()=>{
    try{
const connectInstance=await mongoose.connect(MONGO_URI);
console.log("DB cconnected successfully")
    }
    catch(error){
            console.log("DB connection failed",error)
    }

}

export {connectToMongo};
