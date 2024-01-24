import config from "./config/config.js";
import mongoose from "mongoose";


const { MONGODB_URL } = config;

async function dbConnect() {
    try {
        await mongoose.connect(MONGODB_URL)
        console.log('DB coonect sucessfully')
    }
    catch (err) {
        console.log(err)
    }
}
dbConnect()