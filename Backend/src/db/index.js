import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

mongoose.set("strictQuery", true);

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );
        console.log(
            `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
        );

        mongoose.connection.on("error", (err) => {
            console.error("MongoDB connection error after initial connect:", err);
        });

        mongoose.connection.on("disconnected", () => {
            console.warn("MongoDB disconnected");
        });

        return connectionInstance;
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
};

export default connectDB;
