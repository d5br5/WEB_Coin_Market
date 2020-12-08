const express = require('express');
const fs = require('fs');
var router = express.Router()
// const template = require('../lib/template');
// const auth=require('../lib/auth');

router.get('/', (req, res) => { 
    res.send('Welcome to Coin World!');
});

module.exports = router;