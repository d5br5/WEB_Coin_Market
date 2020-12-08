var express = require('express');
var router = express.Router();

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

        const coin = {
            usd: await Coin.findOne({ code: "usd" }),
            btc: await Coin.findOne({ code: "bitcoin" }),
            eos: await Coin.findOne({ code: "eos" }),
            eth: await Coin.findOne({ code: "ethereum" }),
            bch: await Coin.findOne({ code: "bitcoin-cash" }),
            trx: await Coin.findOne({ code: "tron" }),
            xrp: await Coin.findOne({ code: "ripple" })
        }

        const asset = {
            usd: new Asset({ user, coin: coin.usd, quantity: 100000 }),
            btc: new Asset({ user, coin: coin.btc, quantity: 0 }),
            eos: new Asset({ user, coin: coin.eos, quantity: 0 }),
            eth: new Asset({ user, coin: coin.eth, quantity: 0 }),
            bch: new Asset({ user, coin: coin.bch, quantity: 0 }),
            trx: new Asset({ user, coin: coin.trx, quantity: 0 }),
            xrp: new Asset({ user, coin: coin.xrp, quantity: 0 })
        }
        
        Object.keys(asset).forEach( async (element) => {
            await asset[element].save();
        });

        return res.sendStatus(200);
    }
);

module.exports = router;
