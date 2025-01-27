const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://fujelpatel6013:jbN1rHaVegacX08j@fujel06.raqsi.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Fujel06"
    );
}
// jbN1rHaVegacX08j
module.exports = connectDB;