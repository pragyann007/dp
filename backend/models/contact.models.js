import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:String,
    number:Number,
    grade:String,
    age:String,
    message:String

})

export const Contact = mongoose.model("Contact",contactSchema)
