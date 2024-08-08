import mongoose from "mongoose";

const connectDB =async() =>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.DB_PASSWORD}@cluster0.bmgnpbl.mongodb.net/userAuth`)
        console.log("mongodb connected");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB