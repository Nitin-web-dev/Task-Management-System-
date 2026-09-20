const express = require('express');
const router = express.Router();

const {registerUser, loginUser} = require('../controllers/authcontroller')
const {registerRequestValidation , loginRequestValidation} = require("../middleware/reqValidation");



router.get('/', function (req,res){
    res.status(200).send({
        message: "ok",
        
    })
})


router.post('/register', registerRequestValidation, registerUser)
router.post('/login', loginRequestValidation, loginUser)
module.exports = router;