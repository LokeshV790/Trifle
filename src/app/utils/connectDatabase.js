import mongoose from "mongoose";

export async function connectDatabase(){
    try {
        const client = await mongoose.connect(`${process.env.MONGODB_URI}/waffle`)
    } catch (error) {
        console.log(error)
    }
}