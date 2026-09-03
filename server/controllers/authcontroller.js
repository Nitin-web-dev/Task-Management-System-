


module.exports.registerUser = function(req,res){
    try {
        // todo : create model of registerUser in model folder and require it here and create a user 
        res.status(200).send('controller register');
    } catch (error) {
        console.log(error.message);
    }
}