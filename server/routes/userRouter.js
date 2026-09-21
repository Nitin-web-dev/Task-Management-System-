const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();

const {registerUser, loginUser} = require('../controllers/authcontroller')
const {registerRequestValidation , loginRequestValidation} = require("../middleware/reqValidation");



router.get('/me', function (req,res){
 const token = req.cookies.token;
 if(!token){
    return res.status(401).json({message: "not authenticated"});
 }

 try {
        const decode = jwt.verify(token, process.env.JWT_KEY);
        return res.status(200).json({
            user: {id: decode.userId, email: decode.userEmail}
        });
 } catch (error) {
    return res.status(401).json({message: "invalid  or expired token"});
 }
})


router.post('/register', registerRequestValidation, registerUser)
router.post('/login', loginRequestValidation, loginUser)
module.exports = router;