const express = require('express');
const router = express.Router();

const { wallet } = require('../lib/wallet.js');
const { authentication } = require('../lib/authentication.js');

router.get("/", authentication, async (req, res) => {
        assets = await wallet(req,res);
        res.send(assets); 
});

module.exports = router;