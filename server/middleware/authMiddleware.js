const jwt = require('jsonwebtoken');


module.exports.protect = async function(req,res, next){
    try {
        const token = req.cookies.token;
        if(!token){
            return  res.status(401).json({message: "not authorized , please log in"});
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}