const express = require("express");
const mongoose = require("mongoose");
const crypto = require("crypto");
const{body, validationResult} = require("express-validator");

const {encryptPassword} = require("./lib/crypto");
const {User} = require("./models/user");
const {Coin} = require("./models/coin");
const {Asset} = require("./models/asset");

const port = 3000;
const mongodbLink = "mongodb+srv://tester:Z5knBqgfuOqzb2Pu@cluster0.ye4cg.mongodb.net/Cluster0?retryWrites=true&w=majority"

//mongoose.connect(mongodbLink, {useNewUrlParser:true, useUnifiedTopology:true});

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res)=>{
    res.send("hi")
});

app.use(function (req, res, next) {
    res.status(404).send('404 error : No such page');
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Check Your Fault')
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})

