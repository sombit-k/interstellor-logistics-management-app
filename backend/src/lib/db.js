import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config(); 

export const connectDb=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Successfully connected`,conn.connection.host)
    } catch(err){
        console.log("Error encountered while connecting",err)
    }
}