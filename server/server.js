const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


const app = express();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port: ${PORT}`));