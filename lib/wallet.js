const { User } = require("../models/user");
const { Coin } = require("../models/coin");
const { Asset } = require("../models/asset");

const wallet = async function (req, res) {
    const doc_usd = await Coin.find({ code: 'usd' });
    const doc_btc = await Coin.find({ code: 'bitcoin' });
    const doc_bch = await Coin.find({ code: 'bitcoin-cash' });
    const doc_xrp = await Coin.find({ code: 'ripple' });
    const doc_eos = await Coin.find({ code: 'eos' });
    const doc_eth = await Coin.find({ code: 'ethereum' });
    const doc_trx = await Coin.find({ code: 'tron' });

    const code_usd = doc_usd[0]._id;
    const code_btc = doc_btc[0]._id;
    const code_bch = doc_bch[0]._id;
    const code_xrp = doc_xrp[0]._id;
    const code_eos = doc_eos[0]._id;
    const code_eth = doc_eth[0]._id;
    const code_trx = doc_trx[0]._id;

    const assetInfo_usd = await Asset.find({ user: req.user, coin: code_usd });
    const asset_usd = assetInfo_usd[0].quantity;
    const assetInfo_btc = await Asset.find({ user: req.user, coin: code_btc });
    const asset_btc = assetInfo_btc[0].quantity;
    const assetInfo_bch = await Asset.find({ user: req.user, coin: code_bch });
    const asset_bch = assetInfo_bch[0].quantity;
    const assetInfo_xrp = await Asset.find({ user: req.user, coin: code_xrp });
    const asset_xrp = assetInfo_xrp[0].quantity;
    const assetInfo_eos = await Asset.find({ user: req.user, coin: code_eos });
    const asset_eos = assetInfo_eos[0].quantity;
    const assetInfo_eth = await Asset.find({ user: req.user, coin: code_eth });
    const asset_eth = assetInfo_eth[0].quantity;
    const assetInfo_trx = await Asset.find({ user: req.user, coin: code_trx });
    const asset_trx = assetInfo_trx[0].quantity;
    
    const assets={
        usd : asset_usd,
        btc : asset_btc,
        bch : asset_bch,
        xrp : asset_xrp,
        eos : asset_eos,
        eth : asset_eth,
        trx : asset_trx
    }

    return assets;
}

module.exports = {
    wallet
};