const express = require('express');
const authRouter = express.Router();

const User = require('../models/userModel');
const {
    validationSignUpData,
    validationLoginData,
} = require('../utils/validation');
const bcrypt = require("bcrypt");

authRouter.post("/signUp", async (req, res) => {
    // validation of the data

    try {
        validationSignUpData(req);
        const { firstName, lastName, emailId, password, photoUrl, about, skills } =
            req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
            photoUrl,
            about,
            skills,
        });
        await user.save();
        res.send("user added successfully");
    } catch (error) {
        res.status(400).send("user can't added" + error.message);
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        validationLoginData(req);
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credentials");
        }
        
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            const token = await user.getJWT();
            res.cookie("token", token, {
                expires: new Date(Date.now() + 48 * 3600000),
            });
            res.send("Login Successful");
        } else {
            throw new Error("Invalid credentials password");
        }
    } catch (err) {
        res.send("ERROR : " + err.message);
    }
})

authRouter.post("/logout", async (req, res) => {
    res  //chenning
    .cookie("token", null, {
        expires : new Date(Date.now())
    })
    .send("Logout successful");
})

module.exports = authRouter;