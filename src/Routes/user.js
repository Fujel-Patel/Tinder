const express = require('express');
const userRouter = express.Router();
const {userAuth} = require('../middleware/auth')
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/userModel');
const { set } = require('mongoose');

const USER_SAFE_DATA = "firstName lastName photoUrl age gender skills"

// get all the pending connection request from the loggedIn user 
userRouter.get('/user/request/received',
    userAuth, 
    async (req, res) =>{
        try{
            const loggedInUser = req.user;

            const connectionRequest = await ConnectionRequest.find({
                toUserId : loggedInUser._id,
                status : "intrested"
            }).populate("fromUserId", USER_SAFE_DATA);
            // }).populate("fromUserId", ["firstName", "lastName"]);

            if(!connectionRequest){
                throw new Error("no connection request found")
            }

            res.json({message: "data fetched successfully",
                data: connectionRequest,
            })
        }
        catch(err){
            res.status(400).json({message: "ERROR : " + err.message})
        }
}
)

userRouter.get('/user/connections', 
    userAuth,
    async (req, res) =>
    {
        try{
            const loggedInUser = req.user;

            const connectionRequest = await ConnectionRequest.find({
                $or: [
                    {toUserId: loggedInUser._id, status: "accepted"},
                    {fromUserId: loggedInUser._id, status: "accepted"}
                ],
            }).populate("fromUserId", USER_SAFE_DATA)
              .populate("toUserId", USER_SAFE_DATA)

            const data = connectionRequest.map((raw) => {
                if(raw.fromUserId._id.toString() === loggedInUser._id.toString()){
                    return raw.toUserId;
                }
                return raw.fromUserId;
            })

            res.status(200).json({
                message: "data fetched successfully",
                data,
            })
        }
        catch(err){
            res.status(400).json({
                message: "ERROR : " + err.message,
            })
        }
}
)

userRouter.get('/feed',
    userAuth,
    async(req, res) => {
        try{
            const loggedInUser = req.user;

            const page = parseInt(req.query.page) || 1;
            let limit = parseInt(req.query.limit) || 10;
            limit = limit > 50 ? 50 :limit;
            const skip = (page - 1) * limit;

            const connectionRequest = await ConnectionRequest.find({
                $or : [
                    {fromUserId: loggedInUser._id},
                    {toUserId: loggedInUser._id}
                ]
            }).select("fromUserId toUserId");

            const hiddenUserFromFeed = new Set();

            connectionRequest.forEach((req) => {
                hiddenUserFromFeed.add(req.fromUserId.toString()); 
                hiddenUserFromFeed.add(req.toUserId.toString()); 
            });

            const users = await User.find({
                $and: [
                    {_id: { $nin: Array.from(hiddenUserFromFeed)}},
                    {_id: { $ne: loggedInUser._id}},
                ]
            })
            .select(USER_SAFE_DATA)
            .skip(skip)
            .limit(limit);

            res.status(200).json({data: users})
        }
        catch(err){
            res.status(400).json({message: "ERROR : " + err.message});
        }
    },
)

module.exports = userRouter;