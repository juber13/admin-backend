import mongoose from "mongoose";

const connectDB = async () => {
    try {

        mongoose.connect(process.env.DBURI).then(() => console.log('DB CONNECTED')).catch(err => console.log(err));

    } catch (error) {
        console.log(error)
    }
}

export default connectDB;