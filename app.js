const express = require("express");
const connectDB = require("./src/config/db");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());

const authRouter = require('./src/Routes/auth')
const profileRouter = require('./src/Routes/profile')
const requestRouter = require('./src/Routes/request')
const userRouter = require('./src/Routes/user')

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);

connectDB()
    .then(() => {
        console.log("Database Connected Successfully");
        app.listen(PORT, () => {
            console.log(`app run on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("database not connected");
    });
