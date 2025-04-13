import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
if (!process.env.MONGODB_URI) {
    throw new Error('Database URI is not Provided');
}

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 10000
        });
        // await mongoose.connect(process.env.DEV_DB_URI, {
        //     connectTimeoutMS: 1000
        // });
        console.log('Database connect successfully');
    }
    catch(err) {
        console.log("DB error ", err);
        process.exit(1);
    }
}

export default connectDB;
