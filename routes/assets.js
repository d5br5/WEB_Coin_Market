var express = require('express')
var router = express.Router()
const template = require('../lib/template.js');
const { coinData } = require('../lib/pricing.js');
const { authentication } = require('../lib/authentication.js');

const { User } = require("../models/user");
const { Coin } = require("../models/coin");
const { Asset } = require("../models/asset");
const jwt = require("jsonwebtoken");
const { isValidObjectId } = require('mongoose');

router.get("/", authentication, (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) return res.sendStatus(403);
        const assets = await Asset.find({ user: req.user });
        const doc_usd = await Coin.find({ code: 'usd' });
        const code_usd = doc_usd[0]._id;
        const assetInfo_usd = await Asset.find({ user: req.user, coin: code_usd });
        const asset_usd = assetInfo_usd[0].quantity;

        res.send(assets);
    });
});

module.exports = router;