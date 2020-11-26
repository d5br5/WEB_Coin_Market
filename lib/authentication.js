const { User } = require("../models/user");
const { Coin } = require("../models/coin");
const { Asset } = require("../models/asset");

const authentication = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.sendStatus(401);
    const [bearer, key] = authorization.split(" ");
    if (bearer !== "Bearer") return res.sendStatus(401);
    const user = await User.findOne({ key });
    req.token = key;
    if (!user) return res.sendStatus(401);
    req.user = user;
    req.assets = await Asset.find({ user: req.user });
    next();
};

module.exports = {
    authentication
};