const mongoose = require("mongoose");


async function connectDB (){
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.SERVER_NAME}`);
        console.log('db is connected');
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

module.exports = connectDB;