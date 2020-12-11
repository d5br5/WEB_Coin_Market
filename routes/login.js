var express = require('express'); 
var router = express.Router();

const crypto = require('crypto');

const jwt = require("jsonwebtoken");
const { encryptPassword } = require("../lib/encrypt");

const { User } = require("../models/user");
const { Key } = require("../models/key");


router.post('/', async function (req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password: encryptPassword(password)
    });

    if (!user) return res.status(404).send('No User~');

    const publicKey = crypto.randomBytes(64).toString('hex');
    const secretKey = crypto.randomBytes(64).toString('hex');
    const psKey = new Key({ user, publicKey, secretKey });
    await psKey.save();

    // 클라이언트에서 토큰 생성하기 귀찮을때 생성 함수..
    jwt.sign({pub: publicKey}, secretKey, {expiresIn :5*60}, async (err,token)=>{
    console.log(token);
    })

    res.send({publicKey, secretKey});
    
});

module.exports = router;
