const express = require('express');
const router = express.Router();

const {registerUser} = require('../controllers/authcontroller')



router.get('/', function (req,res){
    res.status(200).send({
        message: "ok",
        
    })
})


router.post('/register', registerUser)
module.exports = router;