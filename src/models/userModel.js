const mongoose = require('mongoose');
const validator = require("validator");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        index : true,
        required : true,
        minLength : 4,
        maxLength : 30
    },
    lastName : {
        type : String,
        required : true
    },
    emailId : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true,
        min : 18
    },
    gender : {
        type : String,
        enum : {
            values : ["male", "female", "other"],
            message : `{VALUE} is not a valid gender type`
        }
        // validate(value) {
        //     if(!["male", "female", "others"].includes(value)){
        //         throw new Error("gender data is not validate")
        //     }
        // }
    },
    photoUrl : {
        type : String,
        default : "https://www.shutterstock.com/image-vector/businessman-profile-picture-user-sign-260nw-302150789.jpg"
    },
    about : {
        type : String,
        default : "this is default about user"
    },
    skills : {
        type : [String],
    }
},
{
    timestamps : true,
}
);

userSchema.methods.getJWT = async function() {
    const user = this;

    const token = await jwt.sign({_id : user._id}, "DEV@Tinder$06", {
        expiresIn : "7d"
    });

    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;