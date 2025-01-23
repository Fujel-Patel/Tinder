const express = require("express");
const app = express();
const dotenv = require('dotenv');
const PORT = process.env.PORT;

dotenv.config();
// const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Tinder");
})

app.listen(PORT, () => {
    console.log(`app run on port ${PORT}`);
});