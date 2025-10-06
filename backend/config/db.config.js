import mongoose from "mongoose";

export const connectDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Databse connection sucessfull .. ")
        
    } catch (error) {

        console.log("Db connection error \n \n  " , error)
        
    }
}