const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",  //refrence to a User collection
        required : true
    },

    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
    },

    status : {
        type : String,
        enum : {
            values : ["ignored", "intrested", "accepted", "rejected"],
            message : `{VALUE} is incorrect status type`
        },
    },
},
    {timestamps: true}
);

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(this.toUserId)){
        throw new Error('cannot send connection request to your self')
    }
    next();
})

connectionRequestSchema.index({fromUserId: 1, toUserId: 1})
const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema)
module.exports = ConnectionRequest;