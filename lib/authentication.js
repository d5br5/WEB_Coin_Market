const { User } = require("../models/user");
const { Coin } = require("../models/coin");
const { Asset } = require("../models/asset");
const { Key } = require("../models/key");

const jwt = require("jsonwebtoken");
const e = require("express");

const authentication = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.sendStatus(401);
    const [bearer, key] = authorization.split(" ");
    if (bearer !== "Bearer") return res.sendStatus(401);
    req.token = key;

    let decodedPk = '';
    try {
        decodedPk = jwt.decode(key).pub;
    } catch (e) {
        return res.status(400).send('invalid token')
    }

    const psKey = await Key.findOne({ publicKey: decodedPk });

    try {
        jwt.verify(key, psKey.secretKey, function (err, decoded) {
            if (err) {
                throw e;
            }
            if(decoded.exp*1000-Date.now()>300000){
                console.log('too long exp..');
                throw e;
            }
        });
    } catch (e) {
        return res.sendStatus(401);
    }

    const user = await User.findOne({ _id: psKey.user });
    if (!user) return res.sendStatus(401);
    req.user = user;
    req.assets = await Asset.find({ user: req.user });
    next();
};

module.exports = {
    authentication
};