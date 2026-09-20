const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
  },
  userEmail: {
    type: String,
    required: [true, "Email address is required"],
    unique: true, // Creates a unique index in MongoDB to prevent duplicate emails
    lowercase: true, // Automatically converts the email to lowercase before saving
    trim: true,
  },
  userPassword: {
    type: String,
    required: true,
   
    select: false,
    minLength: 3,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});



// use this pre method or middleware to hash the password before saving the data in db also check if password is modified or not 
userSchema.pre("save", async function(){
    if(!this.isModified("userPassword")) return ;
    this.userPassword = await bcrypt.hash(this.userPassword, 10);
    // console.log("pre function");
   
})
// if want to use next use this not async await 
//  userSchema.pre("save", function (next) {
//   if (!this.isModified("userPassword")) return next();

//   bcrypt.hash(this.userPassword, 10)
//     .then((hash) => {
//       this.userPassword = hash;
//       console.log("pre function");
//       next();
//     })
//     .catch((err) => next(err));
// });
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
