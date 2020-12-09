const { User } = require("../models/user");
const { Coin } = require("../models/coin");
const { Asset } = require("../models/asset");
const { Key } = require("../models/key");

const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.sendStatus(401);
    const [bearer, key] = authorization.split(" ");
    if (bearer !== "Bearer") return res.sendStatus(401);
    req.token = key;
    decodedPk = jwt.decode(key).pub;

    const psKey = await Key.findOne({publicKey : decodedPk});
    
    jwt.verify(key, psKey.secretKey, function(err, decoded) {
        if(!decoded){return res.sendStatus(401);}
    });
    
    const user = await User.findOne({ _id: psKey.user });
    if (!user) return res.sendStatus(401);
    console.log(user);
    req.user = user;
    req.assets = await Asset.find({ user: req.user });
    next();
};

module.exports = {
    authentication
};