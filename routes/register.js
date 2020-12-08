var express = require('express')
var router = express.Router()
const jwt = require("jsonwebtoken");
const fs = require('fs');
const crypto = require("crypto");
const { body, validationResult } = require("express-validator");
const { encryptPassword } = require("../lib/encrypt");

const { User } = require("../models/user");
const { Coin } = require("../models/coin");
const { Asset } = require("../models/asset");

router.post('/',
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

        const coin0 = await Coin.findOne({ code: "usd" });
        const assetUsd = new Asset({ user, coin : coin0, quantity: 100000 });
        await assetUsd.save();
        
        const coin1 = await Coin.findOne({ code: "bitcoin" });
        const asset1 = new Asset({ user, coin:coin1, quantity: 0 });
        await asset1.save();

        const coin2 = await Coin.findOne({ code: "eos" });
        const asset2 = new Asset({ user, coin:coin2, quantity: 0 });
        await asset2.save();

        const coin3 = await Coin.findOne({ code: "ethereum" });
        const asset3 = new Asset({ user, coin:coin3, quantity: 0 });
        await asset3.save();

        const coin4 = await Coin.findOne({ code: "bitcoin-cash" });
        const asset4 = new Asset({ user, coin:coin4, quantity: 0 });
        await asset4.save();

        const coin5 = await Coin.findOne({ code: "tron" });
        const asset5 = new Asset({ user, coin:coin5, quantity: 0 });
        await asset5.save();

        const coin6 = await Coin.findOne({ code: "ripple" });
        const asset6 = new Asset({ user, coin:coin6, quantity: 0 });
        await asset6.save();

        return res.sendStatus(200);
    }
);

module.exports = router;
