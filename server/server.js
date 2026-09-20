require("dotenv").config();
const express = require('express');
const connectDB = require('./config/config');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routes/userRouter')
const taskRouter = require('./routes/taskRouter')


const app = express();
startServer()
// for connecting with frontend
app.use(cors({
   origin: "http://localhost:5173", // Exact frontend URL (No wildcards '*')
    credentials: true, // Allows cookies to be sent back and forth
}))
app.use(cookieParser()); // for sending and rececing cookies 
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//create endpoint for routes
app.use('/users', userRouter);
app.use('/tasks', taskRouter)





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
