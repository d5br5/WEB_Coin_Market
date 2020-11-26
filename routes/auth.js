var express = require('express')
var router = express.Router()
const jwt = require("jsonwebtoken");
const path = require('path');
const fs = require('fs');
const crypto = require("crypto");
const sanitizeHtml = require('sanitize-html');
const { body, validationResult } = require("express-validator");
//const template = require('../lib/template.js');
const { encryptPassword } = require("../lib/encrypt");

const { User } = require("../models/user");
const { Coin } = require("../models/coin");
const { Asset } = require("../models/asset");

router.get('/signin', function (req, res) {
    fs.readFile('./public/html/signin.html', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});

router.post('/signin_process', async function (req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password: encryptPassword(password)
    });
    
    jwt.sign({user}, 'secretkey',async (err,token)=>{
        const key=token
        user.key=key;
        await user.save();
        res.send({key});
    });
    
    // if (!user) return res.sendStatus(404);
    // const key = crypto.randomBytes(24).toString("hex");
    // user.key = key;
    // await user.save();
    // res.send({ key });
});

router.get('/signout', function (req, res) {

});

router.get('/signup', function (req, res) {
    fs.readFile('./public/html/signup.html', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);

    });
});

router.post('/signup_process',
    [
        body('name').isAlphanumeric().isLength({ min: 4, max: 12 }),
        body('email').isEmail().isLength({ max: 100 }),
        body('password').isLength({ min: 8, max: 16 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, name, password } = req.body;

        if (await User.findOne({ email })) {
            return res.status(400).json({ errors: { email: "Already registered" } });
        }

        const encryptedPassword = encryptPassword(password);
        const user = new User({ email, name, password: encryptedPassword });
        await user.save();

        const coin = await Coin.findOne({ code: "usd" });
        const asset = new Asset({ user, coin, quantity: 100000 });
        await asset.save();

        return res.sendStatus(200);
    }
);

module.exports = router;
