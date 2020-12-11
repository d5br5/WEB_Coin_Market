const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Asset = mongoose.model("Asset", {
  user: { ref: "User", type: Schema.Types.ObjectId },
  coin: { ref: "Coin", type: Schema.Types.ObjectId },
  quantity: Number
});

module.exports = {
  Asset
};