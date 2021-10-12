const { Coin } = require("../models/coin");
const { Asset } = require("../models/asset");

const wallet = async function (req, res) {
    
    const document = {
        usd: await Coin.find({ code: 'usd' }),
        btc: await Coin.find({ code: 'btc' }),
        bch: await Coin.find({ code: 'bch' }),
        xrp: await Coin.find({ code: 'xrp' }),
        eos: await Coin.find({ code: 'eos' }),
        eth: await Coin.find({ code: 'eth' }),
        trx: await Coin.find({ code: 'trx' })
    }

    const assetInfo = {
        usd: await Asset.find({ user: req.user, coin: document.usd[0]._id }),
        btc: await Asset.find({ user: req.user, coin: document.btc[0]._id }),
        bch: await Asset.find({ user: req.user, coin: document.bch[0]._id }),
        xrp: await Asset.find({ user: req.user, coin: document.xrp[0]._id }),
        eos: await Asset.find({ user: req.user, coin: document.eos[0]._id }),
        eth: await Asset.find({ user: req.user, coin: document.eth[0]._id }),
        trx: await Asset.find({ user: req.user, coin: document.trx[0]._id }),
    }

    const wholeAsset = {
        usd: assetInfo.usd[0].quantity,
        btc: assetInfo.btc[0].quantity,
        bch: assetInfo.bch[0].quantity,
        xrp: assetInfo.xrp[0].quantity,
        eos: assetInfo.eos[0].quantity,
        eth: assetInfo.eth[0].quantity,
        trx: assetInfo.trx[0].quantity,
    }

    let showAsset = {};
    Object.keys(wholeAsset).forEach(element => {
        if (wholeAsset[element] > 0) {
            showAsset[element] = wholeAsset[element];
        }
    });

    return showAsset;
}

module.exports = {
    wallet
};