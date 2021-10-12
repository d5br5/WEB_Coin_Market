const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Coin = mongoose.model("Coin", {
  code: String,
  active: { type: Boolean, default: true }
});

module.exports = {
  Coin
};