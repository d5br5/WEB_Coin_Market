var express = require('express');
var router = express.Router();

const jwt = require("jsonwebtoken");
const { encryptPassword } = require("../lib/encrypt");

const { User } = require("../models/user");


router.post('/', async function (req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password: encryptPassword(password)
    });
    if (!user) return res.sendStatus(404);

    jwt.sign({user}, 'secretkey',async (err,token)=>{
        const key=token
        user.key=key;
        await user.save();
        res.send({key});
    });
});

module.exports = router;
