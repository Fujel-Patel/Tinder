const express = require("express");
const connectDB = require('./src/config/db');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const User = require('./src/models/userModel');

app.use(express.json());

app.post('/signUp', async (req, res) => {
    // const {firstName, lastName, emailId, password} = req.body;
    const user = new User(req.body);
    try{
        await user.save();
        res.send("user added successfully");
    }
    catch(error){
        res.status(400).send("user can't added" + error.message);
    }
})

app.get('/user', async(req, res) => {
    const userEmail = req.body.emailId;

    try{
        const user = await User.findOne({emailId : userEmail});
        if(!user || user.length === 0){
            res.send("user doesn't exist");
        }else{
            res.send(user);
        }
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
})

app.get('/feed', async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
})

app.delete('/delete', async (req, res) => {
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        // const user = await User.findByIdAndDelete({_id : userId})
        res.send(`user ${user.firstName} Deleted successfully`);
    }catch(err){
        res.status(400).send("something went wrong");
    }

})

app.patch('/user', async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, data, {returnDocument : "before"});
        console.log(updatedUser)
        if(updatedUser.length === 0){
            res.status(401).send("user not found");
        }else{
            res.send(`user ${updatedUser.firstName} updated successfully`);
        }
    }catch(err){
        res.status(400).send("something went wrong")
    }
})

connectDB()
.then(() => {
    console.log("Database Connected Successfully");
    app.listen(PORT, () => {
        console.log(`app run on port ${PORT}`);
    });
})
.catch((error) => {
    console.error("database not connected");
})