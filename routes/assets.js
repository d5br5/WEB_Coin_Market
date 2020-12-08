const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken");

const { wallet } = require('../lib/wallet.js');
const { authentication } = require('../lib/authentication.js');

router.get("/", authentication, (req, res) => {
    jwt.verify(req.token, 'secretkey', async (err, authData) => {
        if (err) return res.sendStatus(403);
        assets = await wallet(req,res);
        res.send(assets);
    });
});

module.exports = router;