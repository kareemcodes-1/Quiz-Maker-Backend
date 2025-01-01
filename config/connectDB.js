import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        const host = mongoose.connection.host;
        console.log(`Connected on HOST: ${host}`);
    } catch (error) {
        console.log(error);
    }
}

