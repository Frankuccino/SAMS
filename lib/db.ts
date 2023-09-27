import mongoose, { mongo } from "mongoose";
 
const url = process.env.MONGO_URI as string;

let connection: typeof mongoose;

const connectDB = async () => {
    if(!connection) connection = await mongoose.connect(url);
    return connection;
}

export default connectDB;

