require("dotenv").config();
const express = require('express');
const connectDB = require('./config/config');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter')

const app = express();
startServer()

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//create endpoint for routes
app.use('/users', userRouter);





// start server 

function startServer(){
    try {
        connectDB();
        app.listen(process.env.PORT, () => {
            console.log("server in on")
        })
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}
