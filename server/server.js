const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


const app = express();
app.use(cors());
app.use(express.json()); // This lets Express read JSON sent by the client.

// basic api
app.get('/', (req,res) => {
    res.send({id: 1, message: "hello word"});
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));