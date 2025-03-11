const jwt = require("jsonwebtoken");
const User = require('../models/userModel');

const userAuth = async function (req, res, next) {
   try {
    const { token } = req.cookies;
    if(!token){
        throw new Error("invalid token");
    }

    const decodedObj = await jwt.verify(token, "DEV@Tinder$06");

    const { _id } = decodedObj;

    const user = await User.findById(_id);

    if(!user){
        throw new Error("User not found");
    }
    req.user = user;  //highlights
    next()
   }
   catch(err){
    res.json({message:"ERROR : " + err.message});
   }
};

module.exports = {
    userAuth
}